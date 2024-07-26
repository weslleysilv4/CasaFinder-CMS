const router = require('express').Router()
const Access = require('../controllers/accessController')

router.route('/dashboard').get(Access.isAuthenticated, (req, res) => {
  res.render('admin/index')
})

router.get('/dashboard/posts', Access.isAuthenticated, (req, res) => {
  res.render('admin/pages/anuncios')
})

router.get('/dashboard/posts/new', Access.isAuthenticated, (req, res) => {
  res.render('admin/pages/criarPost', {
    username: req.session.user.name,
  })
})

module.exports = router
