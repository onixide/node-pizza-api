const mongoose = require('mongoose');
const winston = require("winston");

//połączenie z mongo. 
module.exports = function(){mongoose.connect('mongodb://localhost/gunnar', { useNewUrlParser: true })
// module.exports = function(){mongoose.connect('mongodb://database:123456a@ds046027.mlab.com:46027/pizza-app-kn-db', {useNewUrlParser: true})
    .then(() => winston.info("MongoDB Connected."))
    //bez catch, obsluga bledow zlapie blad, i powinna wylaczyc apke
};