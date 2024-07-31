const router = require('express').Router()
const db = require('../controllers/dbController')

// router.get('/product/:id', async (req, res) => {
//   const post = await db.getPostById(req.params.id)
//   const data = await db.getAllPosts()
//   res.render('product/index', {
//     loginButton: req.session.user ? 'hidden' : '',
//     logoutButton: req.session.user ? '' : 'hidden',
//     dashboard: req.session.user ? '' : 'hidden',
//     isAuthenticated: req.session.user ? true : false,
//     post: post,
//     data: data,
//   })
// })

router.get('/product/:url', async (req, res) => {
  console.log(req.params.url);
  const post = await db.getPostByURL(req.params.url)
  const data = await db.getAllPosts()
  res.render('product/index', {
    loginButton: req.session.user ? 'hidden' : '',
    logoutButton: req.session.user ? '' : 'hidden',
    dashboard: req.session.user ? '' : 'hidden',
    isAuthenticated: req.session.user ? true : false,
    post: post,
    data: data,
  })
})

module.exports = router
