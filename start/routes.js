const express = require('express');
const users = require('../routes/users');
const orders = require('../routes/orders');
const auth = require('../routes/auth');
const winston = require("winston");

module.exports = function (app) {
    //zeby jsony prtzetwarzalo z req itd
    app.use(express.json());
    app.use(express.urlencoded());

    //endpointy z users, dodaje od razu /users nie tr
    app.use('/users', users);
    app.use('/orders', orders);

    app.use('/auth', auth);

    //middleware do bledow, musi byc na k0ncu, pamietac o next w handlerze, chwyta TYLKO Z REQUEST PROCESIN PIPELINE wyjatki, ignoruje wszystko poza kontekstem expressa (pipeline chyba jest z ekspresa w takim razie ;p)
    app.use(function (err, req, res, next) {
        winston.error(err.message, err);
        res.status(500).send("Błąd serwera. Z ostatniego middleware. ");
    });
};