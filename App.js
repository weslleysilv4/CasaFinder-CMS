//Requires gerais
const path = require("path")
require("dotenv").config()
const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');
const adminRouter = require('./src/routes/admin');

//Express
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

//Template
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "mustache");

//Cookies
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//Sessão
const session = require("express-session");
const { log } = require("console");
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use("/", indexRouter);
app.use("/", adminRouter);
app.use("/", loginRouter);

//Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;