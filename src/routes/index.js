const router = require('express').Router()
const Access = require('../controllers/accessController')
const db = require('../controllers/dbController')
const userRouter = require('./users')
const loginRouter = require('./login')
const postsRouter = require('./posts')

router.use('/', userRouter)
router.use('/', loginRouter)
router.use('/', postsRouter)

router.get('/', async (req, res, next) => {
  try {
    const data = await db.getAllPosts()
    res.render('home/index', {
      loginButton: req.session.user ? 'hidden' : '',
      logoutButton: req.session.user ? '' : 'hidden',
      dashboard: Access.isAdmin(req.session.user) ? '' : 'hidden',
      isAuthenticated: req.session.user ? true : false,
      data: data,
    })
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    next(error)
  }
})

module.exports = router
