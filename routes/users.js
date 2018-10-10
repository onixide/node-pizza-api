const express = require('express');
const router = express.Router();
const { Users, validateUser} = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Tworzenie schema, do klasy schema podawany obiekt
// const userSchema = ;
//tworzenie modelu, w basie bedzie users a tu tworezenie user i dodawanie schemy. Users to klasa

//wszystkie usery wyswietlanie
router.get('/', async (req, res, next) => {
    try {
        res.send(await Users
            .find()
            .sort({ "date": -1 })
        )
    }
    catch (ex) { next(ex); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).send("Nie ma użytkownika o takim id.")
        }

        res.send(user);
    }
    catch (ex) { next(ex); }

});

router.post('/', async (req, res, next) => {
    try {
        //walidacja funkcja 
        console.log(req.body);
        const result = validateUser(req.body);
        // const result = (req.body);
        //sprawdzanie czuy nie ma bledow
        // result.error === null -> valid
        if (result.error) {
            //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
            return res.status(400).send(result.error.details[0].message + "błąd z routera");
            // return res.status(404).send(result.error);
        }

        let user = await Users.findOne({email: req.body.email}) || await Users.findOne({login: req.body.login});
        
        if(user) return res.status(400).send("Login lub email istnieje już w bazie");
        //tworzenie nowego dokumentu? 
        //bez lodasha
        // user = new Users({
        //     login: req.body.login,
        //     password: req.body.password,
        //     email: req.body.email
        // });

        // z lodashem

        user = new Users(_.pick(req.body, ["login", "password", "email", "scope"]));




        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);



        //zapis i nadpisanie zmienna zapisanymi danymi asynchronicznie
        user = await user.save();
        //zwrotka do klienta zapisanymi danymi z bazy ( z key itd)
        
        //bez lodasha
        // res.send({
        //     login: user.login,
        //     email: user.email
        // });


        //takie jakby logowanie odrazu po rejestracji
        const token = user.generateJWTToken();


        res.header('x-auth-token', token).send(_.pick(user, ['login', 'email']));
    }
    catch (ex) { 
        console.log(ex.message);
        // res.send(ex.message);
        next(ex);
    // catch do mongoose, jakby nie bylo joi to wtedy wyswietla wszystkie bledy.message 8.5
    //     for(field in ex.errors) {
    //         console.log(ex.errors[field].message);
    //     }
     }

});


//update user
router.put('/:id', async (req, res, next) => {
    try {
        const result = await validateUser(req.body);

        if (result.error) {
            //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
            return res.status(400).send(result.error.details[0].message + " bat update body");
            // return res.status(404).send(result.error);
        }
        console.log(result);
        const user = await Users.findByIdAndUpdate(req.params.id, result, { new: true });

        await res.send(` UPDATED TO ${user} `);
    }
    catch (ex) { next(ex); }
});

//delete user 
router.delete('/:id', async (req, res, next) => {

    try {
        const user = await Users.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send("Podany użytkownik nie istnieje!");
        }
        res.send(` Usunięto użytkownika ${user}`);
    }
    catch (ex) { next(ex); }
});





//pobieranie userów, konieczna asynchronicznosc bo inaczej nie zdarzy pobrac a wyswietli glupoty
//$gte wieksze rowne od, mongo operatory. 
// async function getUsers() {
//     // const users = await Users.find();
//     const users = await Users
//         .find({ iq: { $gte: 200 } })
//         .select({ Surname: 1 })


//     console.log(users);
// }

module.exports = router;