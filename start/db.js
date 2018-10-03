const mongoose = require('mongoose');

//połączenie z mongo. 
module.exports = function(){mongoose.connect('mongodb://localhost/gunnar')
// module.exports = function(){mongoose.connect('mongodb://database:123456a@ds046027.mlab.com:46027/pizza-app-kn-db', {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected."))
    .catch(err => console.log("MongoDB connection error", err));
};