const router = require('express').Router()
const Access = require('../controllers/accessController')
const userRouter = require('./users')
const loginRouter = require('./login')
const postsRouter = require('./posts')

router.use('/', userRouter)
router.use('/', loginRouter)
router.use('/', postsRouter)

router.get('/', (req, res) => {
  res.render('home/index', {
    loginButton: req.session.user ? 'hidden' : '',
    logoutButton: req.session.user ? '' : 'hidden',
    dashboard: Access.isAdmin(req.session.user) ? '' : 'hidden',
  })
})

module.exports = router
