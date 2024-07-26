const router = require('express').Router()
const Access = require('../controllers/accessController')
const userController = require('../controllers/userController')

router
  .route('/register')
  .post((req, res) => userController.createUser(req, res))

router.route('/dashboard').get(Access.checkLogin, (req, res) => {
  res.render('dashboard/index')
})

module.exports = router
