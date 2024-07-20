require("dotenv").config()

// STATICS
const LOGGER_NAME = "Main Thread"
const { PORT, SESSION_SECRET } = process.env
// STATICS

// IMPORTS
const express = require("express")
const { log } = require("./utils/logger");
// IMPORTS

// MIDDLEWARES
const cors = require("cors")
const cookieParser = require('cookie-parser');
const expressSession = require("express-session")
const logger = require("./middleware/logger");
const passport = require("passport")
// MIDDLEWARES

const app = express()

const apiRouter = require("./routes/api");

setupMiddlewares()

app.use("/api", apiRouter)

app.listen(PORT, () => {
  log(LOGGER_NAME, `💾 Server Is Up At Port ${PORT}`)
  require("./database")()
});

function setupMiddlewares(){
  app.use(express.json())
  app.use(logger)
  app.use(expressSession({secret: SESSION_SECRET, cookie: { maxAge: 1000*60*60*24*15 }, saveUninitialized: true, resave: false}))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cors())
  app.use(cookieParser())
}