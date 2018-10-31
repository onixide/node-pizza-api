const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// const {userSchema} = require("../models/users")

const Pizza = mongoose.model('Pizzas', new mongoose.Schema({
    name: String, 
    size_price: {
        fi30: Number,
        fi40: Number,
        fi50: Number
    },
    components: { type: Array },
    extras: String,
    select_x: String
//TODO enum czy cos zanim do bazy pojdzie
}));


function validatePizza(obj) {
    const schema = ({
        //TODO dodac na froncie w html min max i inne validacje
        //TODO z fi to nie wiadomo, lepiej zeby dalo sie ustawic (moze mała srednia duza ogromna czy cos);
            name: Joi.string(),
            fi30: Joi.number().min(0).required(),
            fi40: Joi.number().min(0),
            fi50: Joi.number().min(0),
            components: Joi.array().items(Joi.string().valid("ser", "szynka", "pieczarki", "szpinak")),
            extras: Joi.string(),
            select_x: Joi.string()

    });

    return Joi.validate(obj, schema);

}

module.exports.Pizza = Pizza;
module.exports.validatePizza = validatePizza;