const router = require('express').Router()
const db = require('../controllers/dbController')
const userRouter = require('./users')
const loginRouter = require('./login')
const postsRouter = require('./posts')
const productRouter = require('./product')

router.use('/', productRouter)
router.use('/', userRouter)
router.use('/', loginRouter)
router.use('/', postsRouter)

router.get('/', async (req, res, next) => {
  try {
    const data = await db.getAllPosts()
    res.render('home/index', {
      loginButton: req.session.user ? 'hidden' : '',
      logoutButton: req.session.user ? '' : 'hidden',
      dashboard: req.session.user ? '' : 'hidden',
      isAuthenticated: req.session.user ? true : false,
      data: data,
    })
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    next(error)
  }
})

module.exports = router
