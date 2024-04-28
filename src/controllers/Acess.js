const Admin = require('../models/Admin');
let flag = false;

module.exports = {
    checkLogin: (req, res, next) => {
        if (req.session.user) {
            flag = true;
            return next();
        }

        req.session.messages = ["User não autenticado"]
        res.redirect("/");
    },

    isLogged: () => { return flag },
    isAdmin: (userProps) => { return Admin.isAdmin(userProps) }
}