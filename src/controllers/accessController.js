const Admin = require('../models/Admin')
const db = require('./dbController')

let accessCondition = false

const authenticateUser = async (email, password) => {
  const userTarget = await db.getByEmail(email, db.getDB_PATH())
  return userTarget && userTarget.password === password ? userTarget : null
}

const changeUserCondition = (newCondition) => {
  accessCondition = newCondition
}

const accessController = {
  login: async (req, res, next) => {
    const { email, password } = req.body

    try {
      const authenticatedUser = await authenticateUser(email, password)

      if (authenticatedUser) {
        req.session.user = authenticatedUser
        changeUserCondition(true)
        return res.redirect('/')
      }

      if (Admin.isAdmin(req.body)) {
        req.session.user = req.body
        return res.redirect('/admin')
      }

      req.session.messages = ['Erro ao realizar login!']
      return res.redirect('/login')
    } catch (error) {
      return next(error)
    }
  },

  saveUser: (req, res, next) => {
    if (req.body.rememberUser) {
      res.cookie('email', req.body.email, { maxAge: 7 * 24 * 60 * 60 * 1000 })
    } else {
      res.clearCookie('email')
    }
    next()
  },

  logout: (req, res) => {
    req.session.user = null
    changeUserCondition(false)
    res.redirect('/')
  },

  checkLogin: (req, res, next) => {
    if (req.session.user) {
      accessCondition = true
      return next()
    }
    req.session.messages = ['Usuário não autenticado']
    res.redirect('/login')
  },

  checkAdminLogin: (req, res, next) => {
    if (Admin.isAdmin(req.session.user)) {
      return next()
    }
    res.redirect('/')
  },

  isLogged: () => accessCondition,

  isAdmin: (userProps) => Admin.isAdmin(userProps),
}

module.exports = accessController
