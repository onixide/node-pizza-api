const jwt = require("jsonwebtoken");


function auth(req, res, next) {

    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("brak dostepu przez brak tokena");

    try{
        const decodedToken = jwt.verify(token, "borsuczi");
        console.log(decodedToken);
        req.user = decodedToken;
        next();
    }
    catch(ex){
        console.log(ex.message + "ex w auth");
        res.status(400).send("invalid token");
    }

}