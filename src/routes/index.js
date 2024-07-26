const router = require('express').Router()
const Access = require('../controllers/accessController')
const userRouter = require('./users')
const loginRouter = require('./login')

router.use('/', userRouter)
router.use('/', loginRouter)

router.get('/', (req, res) => {
  res.render('home/index', {
    loginButton: Access.isLogged() ? 'hidden' : '',
    logoutButton: Access.isLogged() ? '' : 'hidden',
    dashboard: Access.isAdmin(req.session.user) ? '' : 'hidden',
  })
})

module.exports = router
