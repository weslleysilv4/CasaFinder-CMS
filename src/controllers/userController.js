const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(path.dirname(__dirname), '\\database\\userDB.json');
const dbController = require('./dbController');

module.exports = {
    addUser(User) {
        dbController.isDbCreated();
        
    }
}

