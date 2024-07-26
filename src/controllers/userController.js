const path = require('path')
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json')
const dbController = require('./dbController')

module.exports = {
  addUser(userJSON) {
    dbController.addToDB(userJSON, DB_PATH)
  },

  async getUserById(UserId) {
    const usersMap = await dbController.getMap(DB_PATH, 'id')
    return usersMap.get(UserId)
  },

  async getUserByEmail(UserEmail) {
    const usersMap = await dbController.getMap(DB_PATH, 'email')
    return usersMap.get(UserEmail)
  },
}
