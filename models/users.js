const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({

    login: { type: String, required: true, unique: true, minlength: 3, maxlength:255, trim: true },
    password: { type: String, required: true, minlength: 4, maxlength:1024, trim: true  },
    email: { type: String, required: true, unique: true, minlength: 5, maxlength:255, trim: true },
    created: { type: Date, default: Date.now }

});

const Users = mongoose.model('User', userSchema);

//sprawdzanie przed zapisem joiem danych
function validateUser(obj) {

    const schema = ({
        login: Joi.string().alphanum().min(3).max(255).required(),
        password: Joi.string().min(4).max(255).required(),
        email: Joi.string().min(5).max(255).required(),
    });

    return Joi.validate(obj, schema);
}

module.exports.Users = Users;
module.exports.validateUser = validateUser;
// module.exports.userSchema = userSchema;