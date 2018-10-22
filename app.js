const express = require('express');
const app = express();
//gdyby nie uzywac try catch to ta biblioteka obslguje reject z promisow, wyjatki itd. potrzebne error middleware. monke-patching czyli przypisywanie jakies np funkcji jeden funkcje dwa i wywyolywanie jej jako jeden. ten modul dodaje try catch do routera chyba tylko ;p
// require("express-async-errors");
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const favicon = require('serve-favicon');
const path = require('path');



//ochrona naglowkow???? http
app.use(helmet());
//wyswietlanie w konsoli xzapytan http
app.use(morgan('tiny'));

app.use(express.static('public'));


// app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))
app.use(favicon(__dirname + '/public/img/favicon.ico'));

//wazne zeby na poczatku bo to obsluga bledow, zeby mozliwe bylo przechwytywanie z pozniejszych require
require("./start/logging")();

app.set("view engine", "pug");

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 }
}));

app.get('/', (req, res, next) => {
res.redirect("/login");
});



//połączenie do bazy, mozna
// const db = require("./start/db");
// db();
//albo poprostu require z wywolaniem (kazdy modul tak mozna o ile zwraca funckje)
require("./start/db")();
require("./start/routes")(app);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening ${port}!`));
