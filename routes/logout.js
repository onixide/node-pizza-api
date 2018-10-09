const express = require('express');
const router = express.Router();


router.get("/", (req, res, next) => {
   console.log("LOGOUT");

   req.session.destroy();
    res.render("login", {title: "pizzaapp", message: "login view"});

});

module.exports = router;