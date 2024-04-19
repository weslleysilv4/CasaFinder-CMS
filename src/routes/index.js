const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.render("home/index")
})

router.get("/login", (req, res) => {
    res.render("login/index")
})

router.get("/login/admin", (req,res) => {
    res.render("admin/index")
})

module.exports = router