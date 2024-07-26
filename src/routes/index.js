const express = require('express')
const router = express.Router()
const Access = require('../controllers/accessController')

router.get('/', (req, res) => {
  res.render('home/index', {
    loginButton: Access.isLogged() ? 'hidden' : '',
    logoutButton: Access.isLogged() ? '' : 'hidden',
    dashboard: Access.isAdmin(req.session.user) ? '' : 'hidden',
  })
})

router.get('/login', (req, res) => {
  if (!Access.isLogged()) {
    return res.render('login/index')
  }
  res.redirect('/admin')
})

router.get('/cadastro', (req, res) => {
  res.render('signup/index')
})

module.exports = router
