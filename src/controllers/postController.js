const Post = require('../models/Post')
const db = require('./dbController')
const DB_PATH = db.getDB_PATH()
const { createPostValidator } = require('../validator/validationSchemas')

const postController = {
  async createPost(req, res) {
    try {
      const { title, description, price, address, imgURL } = req.body
      const { error } = createPostValidator.validate(req.body)

      const createdBy = req.session.user
        ? req.session.user.email
        : 'theo@mamae.com'
      const post = new Post({
        title,
        description,
        price,
        createdBy,
        address,
        imgURL,
      })
      if (error) {
        console.log({ post, error })
        return res.status(400).send({ error: error.message })
      }
      await db.addPostToUser(createdBy, post)
      res.status(201).json(post)
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  async getAllPosts(req, res) {
    try {
      const posts = await db.getJSON(DB_PATH)
      res.status(200).json(posts)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async getPostById(req, res) {
    try {
      const { id } = req.params
      const post = await db.getById(id, DB_PATH)
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' })
      }
      res.status(200).json(post)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async updatePost(req, res) {
    try {
      const { id } = req.params
      const updatedContent = req.body
      const post = await db.updateInDB(id, updatedContent, DB_PATH)
      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' })
      }
      res.status(200).json(post)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async deletePost(req, res) {
    try {
      const { id } = req.params
      const posts = await db.deleteFromDB(id, DB_PATH)
      res.status(200).json(posts)
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
module.exports = postController
