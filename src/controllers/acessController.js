const Admin = require('../models/Admin');
let acessCondition = false;

module.exports = {
    checkLogin: (req, res, next) => {
        // Se o user estiver ativo o login está ok!
        if (req.session.user) {
            acessCondition = true;
            return next();
        }

        req.session.messages = ["User não autenticado"]
        res.redirect("/");
    },

    isLogged: () => { return acessCondition },
    isAdmin: (userProps) => { return Admin.isAdmin(userProps) },
    changeUserCondition: (newCondition) => { acessCondition = newCondition }
}