const express = require('express');
const router = express.Router();
const { Pizza, validatePizza } = require("../models/pizza");

router.get('/', async (req, res, next) => {

    try {
        const data = await Pizza
            .find({})
        //TODO dodac paginacje
        res.send(data);
    }
    catch (ex) { next(ex); }
});

router.get('/new', async (req, res, next) => {

    try {
        res.render("new_pizza");
    }
    catch (ex) { next(ex); }
});

//logowanie
router.post('/', async (req, res, next) => {
    try {
        // const result = validateOrder(req.body);
        // const result = validatePizza(req.body);
        // if (result.error) {
        //     //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
        //     return res.status(400).send(result.error.details[0].message + " check");
        //     // return res.status(400).send(result.error);
        //     // return res.status(404).send(result.error);
        // }
        console.log(req.body);
        console.log("XXX");
        let pizza = new Pizza({
            name: req.body.name,
            size_price: {
                fi30: req.body.fi30,
                fi40: req.body.fi40,
                fi50: req.body.fi50,
            },
            components: req.body.components,
            extras: req.body.extras
        });
        pizza = await pizza.save();
        res.send(pizza);
    }
    catch (ex) { next(ex); }
});




module.exports = router;
