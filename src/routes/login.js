const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Acess = require('../controllers/acessController');

login = (req, res, next) => {
    if(Admin.isAdmin(req.body)) {
        req.session.user = req.body;
        res.redirect("/admin");
        return next();
    }

    req.session.messages = ["Erro ao realizar login!"];
    res.redirect("/login");
}

// Cria o cookie de "lembrar-me" do usuário.
const salvaUsuario = (req, res, next) => {
    if (req.body.rememberUser) {
        res.cookie("email", req.body.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
    } else {
        res.clearCookie("email");
    }

    return next()
}

const logout = (req, res, next) => {
    req.session.user = null;
    Acess.userLogout();
    res.redirect("/")
}

router.post("/login", salvaUsuario, login);
router.get("/logout", logout);

module.exports = router;