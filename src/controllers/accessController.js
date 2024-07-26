const Admin = require('../models/Admin')
const db = require('./dbController')

const authenticateUser = async (email, password) => {
  const isAdmin = await Admin.isAdmin({ email, password })
  if (isAdmin) {
    return { email, password }
  }
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
        return res.redirect('/dashboard')
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
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Não foi possível fazer logout')
      }
    })
    res.clearCookie('connect.sid')
    changeUserCondition(false)
    res.redirect('/')
  },
  isNotAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/dashboard')
    }
    next()
  },
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next()
    }
    res.redirect('/login')
  },

  isAdmin: (userProps) => Admin.isAdmin(userProps),
}

module.exports = accessController
