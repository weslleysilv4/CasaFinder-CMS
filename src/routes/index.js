const express = require('express')
const router = express.Router()
const Acess = require("../controllers/Acess");

router.get("/", (req, res) => {
    console.log(Acess.Logged());
    if(Acess.Logged()) {
        res.render("home/index", {
            loginButton: "hidden"
        })
        return;      
    }

    res.render("home/index");  
})

router.get("/login", (req, res) => {
    res.render("login/index")
})

router.get("/admin", Acess.isLogged, (req,res) => {
    res.render("admin/index")
})

router.get("/admin/criar-anuncio", (req, res) => {
    res.render("admin/pages/criarPost")
})

router.get("/admin/anuncios", (req, res) => {
    const isAuthenticated = true; // Exemplo - deve ser definido com base na autenticação real
    res.render("admin/pages/anuncios", {isAuthenticated})
})

module.exports = router