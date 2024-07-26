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
  getDB_PATH: () => {
    return DB_PATH
  },
  // Retornar um JSON com as informações do database
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
  addPostToUser: async (userEmail, post) => {
    try {
      const user = dbController.getByEmail(userEmail, DB_PATH)

      if (user === -1) {
        throw new Error('Usuário não encontrado')
      }
      user.posts.push(post)

      fs.writeFileSync(DB_PATH, JSON.stringify(user, null, 2), 'utf-8')
      return user
    } catch (error) {
      console.error('Erro ao adicionar post ao usuário:', error)
      throw error
    }
  },
}

module.exports = dbController
