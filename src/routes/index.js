const express = require('express')
const router = express.Router()
const Acess = require("../controllers/acessController");

router.get("/", (req, res) => {
    res.render("home/index", {
        loginButton: Acess.isLogged() ? "hidden" : "",
        dashboard: Acess.isAdmin(req.session.user) ? "" : "hidden"
    }); 
})

router.get("/login", (req, res) => {
    // Verificação se o usuário já estiver logado, vai renderizar o dashboard.
    if(!Acess.isLogged()){
        return res.render("login/index")
    }
    res.redirect("/admin")
})

module.exports = router;