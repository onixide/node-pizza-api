const express = require('express');
const app = express();
require("express-async-errors");
const morgan = require('morgan');
const helmet = require('helmet');


//połączenie do bazy, mozna
// const db = require("./start/db");
// db();
//albo poprostu require z wywolaniem (kazdy modul tak mozna o ile zwraca funckje)
require("./start/db")();
require("./start/routes")(app);

//ochrona naglowkow???? http
app.use(helmet());
//wyswietlanie w konsoli xzapytan http
app.use(morgan('tiny'));


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening ${port}!`));