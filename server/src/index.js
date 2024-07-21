require("dotenv").config()

// STATICS
const LOGGER_NAME = "Main Thread"
const { PORT, SESSION_SECRET, MONGODB_URI } = process.env
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
const rateLimit = require("./middleware/rateLimit");
const MongoStore = require("connect-mongo");
const { default: mongoose } = require("mongoose");
// MIDDLEWARES

const app = express()
setupMiddlewares()

app.use("/api", require("./routes/api"))

launchServer()

async function launchServer(){
  await require("./database")() // Connect To The DB

  app.listen(PORT, () => {
    log(LOGGER_NAME, `💾 Server Is Up At Port ${PORT}`)
  });
}

function setupMiddlewares(){
  app.use(express.json())
  app.use(cors({origin: "*"}))
  app.use(logger)
  app.use(expressSession({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000*60*60*24*15
    },
    store: MongoStore.create({
      mongoUrl: MONGODB_URI
    })
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(rateLimit)
  app.use(cookieParser())
}