let flag = false;

module.exports = {
    isLogged: (req, res, next) => {
        if (req.session.user) {
            flag = true;
            return next();
        }

        req.session.messages = ["User não autenticado"]
        res.redirect("/");
    },

    Logged: () => { return flag }
}