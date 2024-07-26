const express = require('express')
const router = express.Router()
const accessController = require('../controllers/accessController')
const userController = require('../controllers/userController')

router.route('/login').get((req, res) => {
  res.render('login/index')
})

router.route('/login').post(async (req, res, next) => {
  try {
    await accessController.login(req, res, next)
  } catch (error) {
    next(error)
  }
})
module.exports = router
