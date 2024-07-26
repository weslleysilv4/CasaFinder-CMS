const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Access = require('../controllers/accessController');
const userController = require('../controllers/userController');

login = async (req, res, next) => {
    const userInput = req.body;
    const authentication = await authLogin(userInput);

    if(authentication) {
        req.session.user = authentication;
        res.redirect('/');
        Access.changeUserCondition(true);
        return next();
    }
    
    if(Admin.isAdmin(userInput)) {
        req.session.user = userInput;
        res.redirect("/admin");
        return next();
    }

    req.session.messages = ["Erro ao realizar login!"];
    res.redirect("/login");
}

authLogin = async (userInput) => {
    const userTarget = await userController.getUserByEmail(userInput.email);
    return (userTarget && userTarget.password === userInput.password)
        ? userTarget 
        : undefined;
}

// Cria o cookie de "lembrar-me" do usuário.
salvaUsuario = (req, res, next) => {
    if (req.body.rememberUser) {
        res.cookie("email", req.body.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
    } else {
        res.clearCookie("email");
    }

    return next()
}

logout = (req, res, next) => {
    req.session.user = null;
    Access.changeUserCondition(false);
    res.redirect("/")
}

router.post("/login", salvaUsuario, login);
router.get("/logout", logout);

module.exports = router;