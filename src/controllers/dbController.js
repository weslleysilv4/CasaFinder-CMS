const fs = require('fs')
const path = require('path')
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json')

const dbController = {
  // Adiciona o conteúdo ao database
  addToDB: (Content, Path) => {
    const fileContent = JSON.parse(fs.readFileSync(Path, 'utf-8'))
    fileContent.push(Content)

    fs.writeFile(Path, JSON.stringify(fileContent, null, 2), (error) => {
      if (error) throw error
    })
  },
  // Retorna o caminho do database
  getDB_PATH: () => {
    return DB_PATH
  },
  // Retornar um JSON com as informações do database
  getJSON: async function (Path) {
    const fileContent = fs.readFileSync(Path, 'utf-8')
    return JSON.parse(fileContent)
  },
  // Retorna um Map com os dados do database
  getMap: async function (keyField, Path) {
    const jsonContent = await this.getJSON(Path)
    const map = new Map()
    jsonContent.forEach((user) => map.set(user[keyField], user))
    return map
  },

  // Obtém um item pelo ID
  getById: async function (id, Path) {
    const jsonContent = await this.getJSON(Path)
    return jsonContent.find((item) => item.id === id)
  },

  // Obtém um item pelo email
  getByEmail: async function (email, Path) {
    const jsonContent = await this.getJSON(Path)
    return jsonContent.find((item) => item.email === email)
  },

  // Atualiza um item
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

  // Remove um item
  deleteFromDB: async function (id, Path) {
    const jsonContent = await this.getJSON(Path)
    const filteredContent = jsonContent.filter((item) => item.id !== id)
    fs.writeFile(Path, JSON.stringify(filteredContent, null, 2), (error) => {
      if (error) throw error
    })
    return filteredContent
  },

  // Busca todos os posts
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
  // Adiciona um post ao usuário
  addPostToUser: async (userEmail, post) => {
    try {
      const user = await dbController.getByEmail(userEmail, DB_PATH)
      if (user === -1) {
        throw new Error('Usuário não encontrado')
      }
      const content = dbController.getJSON(DB_PATH)
      content.then((users) => {
        const updatedUsers = users.map((user) => {
          if (user.email === userEmail) {
            user.posts.push(post)
          }
          return user
        })
        fs.writeFile(
          DB_PATH,
          JSON.stringify(updatedUsers, null, 2),
          (error) => {
            if (error) throw error
          }
        )
      })
    } catch (error) {
      console.error('Erro ao adicionar post ao usuário:', error)
      throw error
    }
  },

  // Busca todos os posts
  getAllPosts: async () => {
    try {
      const list = dbController.findPosts()
      return list
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      throw error
    }
  },
  getAllPostsByUser: async (userEmail) => {
    try {
      const user = await dbController.getByEmail(userEmail, DB_PATH)
      if (user === -1) {
        throw new Error('Usuário não encontrado')
      }
      const content = dbController.getJSON(DB_PATH)
      content.then((users) => {
        let list = users.map((user) => {
          if (user.email === userEmail) {
            list = user.posts
          }
          return list
        })
      })
      return content
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
  updatePost: async (postId, updatedContent) => {
    const users = await dbController.getJSON(DB_PATH); 
    let postUpdated = false;

    users.forEach(user => {
      user.posts.forEach(post => {
        if(post.id === postId) {
          post.title = updatedContent.title;
          post.description = updatedContent.description;
          post.price = updatedContent.price;
          post.address = updatedContent.address;
          post.createdBy = updatedContent.createdBy;
          postUpdated = true;
        } 
      })
    });

    if (!postUpdated) throw new Error('Post não encontrado!');
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf8');
    return postUpdated;
  },
}

module.exports = dbController
