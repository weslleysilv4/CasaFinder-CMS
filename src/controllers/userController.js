const path = require('path')
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json')
const db = require('./dbController')
const User = require('../models/User')

const userController = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body
      const userFounded = await db.getByEmail(email, DB_PATH)
      if (userFounded) {
        return res.status(400).json({ error: 'Usuário já cadastrado' })
      }
      const user = new User({ username, email, password })
      await db.addToDB(user, DB_PATH)
      res.status(201).send(user)
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
}

module.exports = userController
