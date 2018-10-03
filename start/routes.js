const express = require('express');

const users = require('../routes/users');
const orders = require('../routes/orders');

module.exports = function (app) {
    //zeby jsony prtzetwarzalo z req itd
    app.use(express.json());

    //endpointy z users, dodaje od razu /users nie tr
    app.use('/users', users);

    app.use('/orders', orders);

    //middleware do bledow, musi byc na k0ncu, pamietac o next w handlerze
    app.use(function (err, req, res, next) {
        res.status(500).send("Błąd serwera. Z ostatniego middleware. ");
    });
};