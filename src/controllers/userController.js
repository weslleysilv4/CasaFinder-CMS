const path = require('path');
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json');
const dbController = require('./dbController');
const User = require('../models/User');

module.exports = {
    addUser(userJSON) {
        dbController.isDbCreated(DB_PATH);
        dbController.addToDB(userJSON, DB_PATH);
    },

    async getUserById(id) {
        const usersMap = await dbController.getMap(DB_PATH);
        return usersMap.get(id);
    },

    getUserByEmail: async function(email) {
        const usersMap = await dbController.getMap(DB_PATH);
        return usersMap.get(email);
    }
}

