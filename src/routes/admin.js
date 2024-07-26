const express = require('express');
const router = express.Router();
const Access = require('../controllers/accessController');

router.use("/admin", Access.checkAdminLogin);

router.get("/admin", (req, res) => {
    res.render("admin/index");
})

router.get("/admin/criar-anuncio", (req, res) => {
    res.render("admin/pages/criarPost")
})

router.get("/admin/anuncios", (req, res) => {
    res.render("admin/pages/anuncios")
})

module.exports = router;