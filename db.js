var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test')
    .then(()=> console.log("dziala"))
    .catch(console.log("error"));

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("sziala");
// });

