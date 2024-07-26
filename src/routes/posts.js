const router = require('express').Router()
const Access = require('../controllers/accessController')
const postController = require('../controllers/postController')

router.get('/dashboard', Access.isAuthenticated, (req, res) => {
  res.render('admin/index')
})

router.get('/dashboard/posts', Access.isAuthenticated, (req, res) => {
  res.render('admin/pages/anuncios')
})

router.get('/dashboard/posts/new', Access.isAuthenticated, (req, res) => {
  res.render('admin/pages/criarPost', {
    email: req.session.user.email,
  })
})
router.post('/dashboard/posts/new', postController.createPost)
router.get('/posts', postController.getAllPosts)
router.get('/posts/:id', postController.getPostById)
router.put('/posts/:id', postController.updatePost)
router.delete('/posts/:id', postController.deletePost)

module.exports = router
