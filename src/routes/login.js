const express = require('express')
const router = express.Router()
const accessController = require('../controllers/accessController')

router.route('/login').get(accessController.isNotAuthenticated, (req, res) => {
  res.render('login/index')
})

router.route('/logout').get((req, res) => {
  accessController.logout(req, res)
})

router.route('/login').post(async (req, res, next) => {
  try {
    await accessController.login(req, res, next)
  } catch (error) {
    next(error)
  }
})
module.exports = router
