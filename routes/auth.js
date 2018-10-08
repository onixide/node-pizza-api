const express = require('express');
const router = express.Router();
const { Users} = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");


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


        res.send(token);
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