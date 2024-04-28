const express = require('express')
const router = express.Router()
const Acess = require("../controllers/Acess");

router.get("/", (req, res) => {
    res.render("home/index", {
        loginButton: Acess.isLogged ? "hidden" : ""
    });  
})

router.get("/login", (req, res) => {
    res.render("login/index")
})

module.exports = router;