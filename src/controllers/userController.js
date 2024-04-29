const path = require('path');
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json');
const dbController = require('./dbController');
const User = require('../models/User');

module.exports = {
    addUser(user) {
        dbController.isDbCreated(DB_PATH);
        const newUser = new User(user);
        const postJSON = JSON.parse(JSON.stringify(newUser));
        dbController.addToDB(postJSON, DB_PATH);
    },

    async getUserById(id) {
        const usersMap = await dbController.getMap(DB_PATH);
        return usersMap.get(id);
    },

    async getUserByEmail(email) {
        const usersMap = await dbController.getMap(DB_PATH);
        return usersMap.get(email);
    }
}

