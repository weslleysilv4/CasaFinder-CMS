const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/register', (req, res) => {
  res.render('signup/index')
})

router
  .route('/register')
  .post((req, res) => userController.createUser(req, res))

router.route('/users').get((req, res) => userController.getAllUsers(req, res))
router
  .route('/users/:id')
  .get((req, res) => userController.getUserById(req, res))
router
  .route('/users/:id')
  .put((req, res) => userController.updateUser(req, res))
router
  .route('/users/:id')
  .delete((req, res) => userController.deleteUser(req, res))

module.exports = router
