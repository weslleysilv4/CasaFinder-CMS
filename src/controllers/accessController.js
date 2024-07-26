const Admin = require('../models/Admin');
let acessCondition = false;

module.exports = {
    checkLogin: (req, res, next) => {
        if (req.session.user) {
            acessCondition = true;
            return next();
        }
        req.session.messages = ["User não autenticado"]
        res.redirect("/");
    },

    checkAdminLogin: (req, res, next) => {
        if (Admin.isAdmin(req.session.user)) return next();
        res.redirect("/");
    },

    isLogged: () => { return acessCondition },
    isAdmin: (userProps) => { return Admin.isAdmin(userProps) },
    changeUserCondition: (newCondition) => { acessCondition = newCondition },
}