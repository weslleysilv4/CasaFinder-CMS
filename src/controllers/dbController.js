const fs = require('fs')
const path = require('path')
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json')

const dbController = {
  addToDB: (Content, Path) => {
    const fileContent = JSON.parse(fs.readFileSync(Path, 'utf-8'))
    fileContent.push(Content)

    fs.writeFile(Path, JSON.stringify(fileContent, null, 2), (error) => {
      if (error) throw error
    })
  },
  getDB_PATH: () => {
    return DB_PATH
  },
  getJSON: async function (Path) {
    const fileContent = fs.readFileSync(Path, 'utf-8')
    return JSON.parse(fileContent)
  },
  getMap: async function (keyField, Path) {
    const jsonContent = await this.getJSON(Path)
    const map = new Map()
    jsonContent.forEach((user) => map.set(user[keyField], user))
    return map
  },
  getById: async function (id, Path) {
    const jsonContent = await this.getJSON(Path)
    return jsonContent.find((item) => item.id === id)
  },
  getByEmail: async function (email, Path) {
    const jsonContent = await this.getJSON(Path)
    return jsonContent.find((item) => item.email === email)
  },
  updateInDB: async function (id, updatedContent, Path) {
    const jsonContent = await this.getJSON(Path)
    const index = jsonContent.findIndex((item) => item.id === id)
    if (index !== -1) {
      jsonContent[index] = { ...jsonContent[index], ...updatedContent }
      fs.writeFile(Path, JSON.stringify(jsonContent, null, 2), (error) => {
        if (error) throw error
      })
      return jsonContent[index]
    }
    return null
  },
  deleteFromDB: async function (id, Path) {
    const jsonContent = await this.getJSON(Path)
    const filteredContent = jsonContent.filter((item) => item.id !== id)
    fs.writeFile(Path, JSON.stringify(filteredContent, null, 2), (error) => {
      if (error) throw error
    })
    return filteredContent
  },
  findPosts: async () => {
    try {
      const users = await dbController.getJSON(DB_PATH)
      const posts = users.flatMap((user) => user.posts)
      return posts
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      throw error
    }
  },
  addPostToUser: async (userEmail, post) => {
    try {
      const user = await dbController.getByEmail(userEmail, DB_PATH)
      if (!user) {
        throw new Error('Usuário não encontrado')
      }
      const content = await dbController.getJSON(DB_PATH)
      const updatedUsers = content.map((u) => {
        if (u.email === userEmail) {
          u.posts.push(post)
        }
        return u
      })
      fs.writeFile(DB_PATH, JSON.stringify(updatedUsers, null, 2), (error) => {
        if (error) throw error
      })
    } catch (error) {
      console.error('Erro ao adicionar post ao usuário:', error)
      throw error
    }
  },
  getAllPosts: async () => {
    try {
      const list = await dbController.findPosts()
      return list
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      throw error
    }
  },
  getAllPostsByUser: async (userEmail) => {
    try {
      const user = await dbController.getByEmail(userEmail, DB_PATH)
      if (!user) {
        throw new Error('Usuário não encontrado')
      }
      const users = await dbController.getJSON(DB_PATH)
      const userPosts = users
        .flatMap((u) => u.posts)
        .filter((post) => post.createdBy === userEmail)
      return userPosts
    } catch (error) {
      console.error('Erro ao buscar posts do usuário:', error)
      throw error
    }
  },
  getPostById: async (id) => {
    try {
      const posts = await dbController.getJSON(DB_PATH)
      const post = posts
        .flatMap((user) => user.posts)
        .find((post) => post.id === id)
      if (!post) {
        throw new Error('Post não encontrado')
      }
      return post
    } catch (error) {
      console.error('Erro ao buscar post por ID:', error)
      throw error
    }
  },
  getPostByURL: async (url) => {
    try {
      const posts = await dbController.getJSON(DB_PATH)
      const post = posts
        .flatMap((user) => user.posts)
        .find((post) => post.url === url)
      if (!post) {
        throw new Error('Post não encontrado')
      }
      return post
    } catch (error) {
      console.error('Erro ao buscar post por URL:', error)
      throw error
    }
  },
  updatePost: async (postId, updatedContent) => {
    const users = await dbController.getJSON(DB_PATH)
    let postUpdated = false

    users.forEach((user) => {
      user.posts.forEach((post) => {
        if (post.id === postId) {
          Object.assign(post, updatedContent)
          postUpdated = true
        }
      })
    })
    if (!postUpdated) throw new Error('Post não encontrado!')
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf8')
    return postUpdated
  },
  deletePost: async (postId) => {
    const users = await dbController.getJSON(DB_PATH)
    users.forEach((user) => {
      user.posts = user.posts.filter((post) => post.id !== postId)
    })
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8')
  },
}

module.exports = dbController
