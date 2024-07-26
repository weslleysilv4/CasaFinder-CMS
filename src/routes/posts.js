const router = require('express').Router()
const Access = require('../controllers/accessController')

router.route('/dashboard').get(Access.isAuthenticated, (req, res) => {
  res.render('admin/index')
})

router.get('/dashboard/posts', Access.isAuthenticated, (req, res) => {
  res.render('admin/pages/anuncios')
})

module.exports = router
