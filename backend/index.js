//importing modules
const http = require("http")
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const compression = require("compression")
var cookieParser = require("cookie-parser");
var session = require("express-session");

// using middlewares
app.use(cookieParser());

app.use(express.json());
const apiRoutes = require('./routes');

app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(253402300000000) }
  })
);

app.use('/api', cors({ credentials: true, origin: "http://localhost:3000" }), apiRoutes);


const helmet = require('helmet');
const sequelize = require('./database')

app.use(helmet());

app.use(bodyParser.json());
app.use(compression());

const authCheck = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

app.get("/api", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.session.user.email,
    cookies: req.cookies
  });
});

const server = http.createServer(app);


const PORT = process.env.PORT || 8000;
server.listen(PORT);

server.on('listening', () => {
  console.log(`Server is Listening on PORT ${PORT}`);
});

module.exports = app;
