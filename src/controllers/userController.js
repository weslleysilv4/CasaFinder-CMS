const path = require('path')
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json')
const db = require('./dbController')
const User = require('../models/User')
const { createUserValidator } = require('../validator/validationSchemas')

const userController = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body
      const { error } = createUserValidator.validate(req.body)
      if (error) {
        return res.status(400).json({ error: error.message })
      }
      const userFounded = await db.getByEmail(email, DB_PATH)
      if (userFounded) {
        return res.status(400).json({ error: 'Usuário já cadastrado' })
      }
      const user = new User({ username, email, password })
      await db.addToDB(user, DB_PATH)
      res.status(201).json(user)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await db.getJSON(DB_PATH)
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async getUserById(req, res) {
    try {
      const { id } = req.params
      const user = await db.getById(id, DB_PATH)
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const updatedContent = req.body
      const user = await db.updateInDB(id, updatedContent, DB_PATH)
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const user = await db.deleteFromDB(id, DB_PATH)
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },
}

module.exports = userController
