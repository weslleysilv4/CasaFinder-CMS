const Post = require('../models/Post')
const db = require('./dbController')
const DB_PATH = db.getDB_PATH()
const { createPostValidator } = require('../validator/validationSchemas')

const postController = {
  async createPost(req, res) {
    try {
      const { title, description, price, address, imgURL } = req.body
      const { error } = createPostValidator.validate(req.body)

      const createdBy = req.session.user ? req.session.user.email : null

      if (error) {
        return res
          .status(400)
          .redirect('/dashboard/posts/new', { error: error.message })
      }

      const post = new Post({
        title,
        description,
        price,
        createdBy,
        address,
        imgURL,
      })

      await db.addPostToUser(createdBy, post)
      res.status(201).redirect('/dashboard/posts')
    } catch (error) {
      res
        .status(400)
        .send(error)
        .render('/dashboard/posts/new', { error: error.message })
    }
  },
  async getAllPosts(req, res) {
    try {
      const posts = await db.getAllPostsByUser(req.session.user.email)
      console.log(posts)
      res.status(200).json(posts)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async getPostById(req, res) {
    try {
      const { id } = req.params
      const post = await db.getPostById(id)
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
      const id = req.body.id
      const updatedContent = req.body
      const post = await db.updatePost(id, updatedContent)

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' })
      }

      res.status(200).redirect('/dashboard/posts')
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async deletePost(req, res) {
    try {
      const id = req.query.id
      await db.deletePost(id, DB_PATH)
      res.status(200).redirect('/dashboard/posts')
    } catch (error) {
      res.status(400).json(error)
    }
  },
}
module.exports = postController
