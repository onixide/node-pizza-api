const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// const {userSchema} = require("../models/users")

const Order = mongoose.model('Orders', new mongoose.Schema({

    //id
    date: { type: Date, default: Date.now },
    // user: { type : userSchema, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref : "User"},
    paid: { type: Boolean, default: false},
    done: {type: Boolean, default: false},
    adress: {
        ulica: String,
        numer: Number,
        kod: Number,
        miasto: String
    }

}));

function validateOrder(obj) {
    const schema = ({
        // user: Joi.objectId().required(),
            ulica: Joi.string(),
            numer: Joi.number(),
            kod: Joi.number(),
            miasto: Joi.string()

    });

    return Joi.validate(obj, schema);

}

module.exports.Order = Order;
module.exports.validateOrder = validateOrder;