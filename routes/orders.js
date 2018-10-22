const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const { Order, validateOrder } = require("../models/order");
const { Users } = require("../models/users");

router.get('/', async (req, res, next) => {
    try {
        if (req.session.scope === undefined) return res.redirect("/login");

        if (req.session.scope === "admin") {
            const data = await Order
                .find()
                //wyszukiwanie i dodawanie dokumentu do dokumentu, pierwszy arg dotyczy pola, drugi to co pokazac jako jeden, z - do usunac z wynikow
                .populate("user", "login")
            console.log(data);
            res.render("orders", {
                data: data,
                log: req.session.login
            });
        }
        else {
            const data = await Order
                .find({ user: req.session._id })
                //wyszukiwanie i dodawanie dokumentu do dokumentu, pierwszy arg dotyczy pola, drugi to co pokazac jako jeden, z - do usunac z wynikow
                .populate("user", "login")
                //TODO dodac paginacje
            res.render("orders", { data });
        }
    }
    catch (ex) { next(ex); }
});
//logowanie
router.post('/', async (req, res, next) => {
    try {
        // const result = validateOrder(req.body);
        const result = validateOrder(req.body);
        if (result.error) {
            //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
            return res.status(400).send(result.error.details[0].message + " check");
            // return res.status(404).send(result.error);
        }

        const user = await Users.findById(req.session._id);
        if (!user) {
            return res.status(400).send("Nie ma takiego użytkownika.")
        }
        console.log(req.session.login);
        let order = new Order({
            user : req.session._id,
            adress: {
                ulica: req.body.ulica,
                numer: req.body.numer,
                kod: req.body.kod,
                miasto: req.body.miasto
            }
        });
        order = await order.save();
        res.send(order);
    }
    catch (ex) { next(ex); }
});



router.get('/new', async (req, res, next) => {
    try {
        // // const result = validateOrder(req.body);
        // const result = validateOrder(req.body);
        // if (result.error) {
        //     //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
        //     return res.status(400).send(result.error.details[0].message + " check");
        //     // return res.status(404).send(result.error);
        // }

        // const user = await Users.findById(req.body.user);
        // if (!user) {
        //     return res.status(400).send("Nie ma takiego użytkownika.")
        // }

        // let order = new Order(req.body);
        // order = await order.save();
        // res.send(order);
        res.render("new_order");
    }
    catch (ex) { next(ex); }
});

router.put('/:id', async (req, res, next) => {

    try {
        const result = validateOrder(req.body);
        if (result.error) {
            //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
            return res.status(400).send(result.error.details[0].message + " check");
            // return res.status(404).send(result.error);
        }

        const order = await Order.findByIdAndUpdate(req.params.id, result, { new: true });
        if (!order) return res.status(400).send("Nie ma takiego zamówienia.")

        await res.send(` UPDATED ORDER TO ${order} `);
    }
    catch (ex) { next(ex); }
});


router.delete("/:id", async (req, res, next) => {

    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).send("Podane zamówienie nie istnieje!");
        }
        
        res.send(` Usunięto zamówienie ${order}`);
    }
    catch (ex) { next(ex); }
});

module.exports = router;

//337cb7b7d358011ca7b85b8d8a25149876cc6be4 gh toekn do uploadow