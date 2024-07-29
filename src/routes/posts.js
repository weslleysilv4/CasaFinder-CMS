const router = require('express').Router()
const Access = require('../controllers/accessController')
const postController = require('../controllers/postController')
const db = require('../controllers/dbController')

router.get('/dashboard', Access.isAuthenticated, async (req, res) => {
  const data = Access.isAdmin(req.session.user)
    ? await db.getAllPosts()
    : await db.getAllPostsByUser(req.session.user.email)
  res.render('admin/index', {
    data: data,
  })
})

router.get('/dashboard/posts', Access.isAuthenticated, async (req, res) => {
  const data = Access.isAdmin(req.session.user)
    ? await db.getAllPosts()
    : await db.getAllPostsByUser(req.session.user.email)
  res.render('admin/pages/anuncios', {
    data: data,
  })
})

router.get('/dashboard/posts/new', Access.isAuthenticated, (req, res) => {
  res.render('admin/pages/criarPost', {
    email: req.session.user.email,
  })
})
router.post('/dashboard/posts/new', postController.createPost)
router.get('/dashboard/posts', postController.getAllPosts)
router.get('/dashboard/posts/:id', postController.getPostById)
router.put('/dashboard/posts/edit/:id', postController.updatePost)
router.delete('/dashboard/posts/remove/:id', postController.deletePost)

module.exports = router
