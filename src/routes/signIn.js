const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');

signIn = (req, res, next) => {
    const newUser = new User(req.body);
    req.session.user = newUser.toJSON();
    userController.addUser(newUser.toJSON());
    res.redirect("/");
}

// Cria o cookie de "lembrar-me" do usuário.
let salvaUsuario = (req, res, next) => {
    if (req.body.rememberUser) {
        res.cookie("email", req.body.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
    } else {
        res.clearCookie("email");
    }

    return next()
}

router.post("/signIn", signIn);
module.exports = router;