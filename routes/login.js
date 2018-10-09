const express = require('express');
const router = express.Router();
const { Users} = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");


router.get("/", (req, res, next) => {
    console.log(req.session);
    console.log("HHH");
    if(req.session.login !== undefined) return res.redirect("/orders");
    res.render("login", {title: "pizzaapp", message: "login view"});

});

router.post('/', async (req, res, next) => {
    try {
        //walidacja funkcja 
        const result = validate(req.body);
        if (result.error) {
            //zwracanie pola message z obiektu error z joi'a. gdy blad ofc
            return res.status(400).send(result.error.details[0].message + "JOI ERROR");
        }

        let user = await Users.findOne({login: req.body.login});
        if(!user) return res.status(400).send("Zły login lub hasło (tu login xd)");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(validPassword);
        if(!validPassword) return res.status(400).send("Zły login lub hasło (tu haslo xd)");

        const token = user.generateJWTToken();
        console.log("------token decoded------");
        console.log(jwt.decode(token));
        console.log("----------------");

        req.cookies = ("AAA", "BBB");
        req.session.login = user.login;
        req.session.scopex = user.scopex;
        req.session._id = user._id;
        console.log('----');
        console.log(user.scopex);
        console.log(user.email);
        console.log('----');
        console.log(user);
        console.log(req.session.login);
        console.log(req.session.scopex);
        console.log(req.session);
        console.log("^^^");
        res.redirect('/orders');
       
    }
    catch (ex) { 
        console.log(ex.message);
        next(ex);
     }

});





function validate(obj){

    const schema = ({
        login: Joi.string().alphanum().min(3).max(255).required(),
        //mozna uzyc joi-password-comlexity do hasla zeby dodac jakies duze male litery itd
        password: Joi.string().min(4).max(255).required(),
    });

    return Joi.validate(obj, schema);

}

module.exports = router;