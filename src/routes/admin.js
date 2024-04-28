const express = require('express');
const router = express.Router();
const Acess = require('../controllers/Acess');

router.get("/admin", Acess.checkLogin, (req,res) => {
    console.log(Acess.isLogged());
    res.render("admin/index")
})

router.get("/admin/criar-anuncio", (req, res) => {
    res.render("admin/pages/criarPost")
})

router.get("/admin/anuncios", (req, res) => {
    res.render("admin/pages/anuncios")
})

module.exports = router;