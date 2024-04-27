const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.render("home/index")
})

router.get("/login", (req, res) => {
    res.render("login/index")
})

router.get("/admin", (req,res) => {
    //TODO: Verificar se o usuário está autenticado (exemplo: req.isAuthenticated())
    // Exemplo - deve ser definido com base na autenticação rea
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