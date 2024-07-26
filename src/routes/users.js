const router = require('express').Router()
const Access = require('../controllers/accessController')
const userController = require('../controllers/userController')

router
  .route('/register')
  .post((req, res) => userController.createUser(req, res))

module.exports = router
