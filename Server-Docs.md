# Server Docs
<p style="color:#F64444">IMPORTANT!!!! This app is supposed to be a shitty app made in 15~ hours</p>

## Database
For the db we used mongodb and mongoose (ORM). interaction with the db is done through these steps:
1. User request / Cron Job
2. Server Request Handling
3. Interactors (See [This](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423))
4. Mongoose
5. MongoDB Driver

## API Usage

### /api/auth/
This endpint accepts a username and password in a json format. if the user is present in the db but the passwords dont match, a `ERR_PASSWORD_WRONG` will be thrown. if anything unexpected happens, `ERR_UNEXPECTED` gets thrown. you will get a 200 if it was successful

### /api/auth/status/
This endpoint returns the public user profile object of the currently logged in user. will return 401 in case you are unauthorized and a `ERR_UNAUTHORIZED` will be thrown

### /api/auth/logout/
This endpoint logs out the current user. throws `ERR_UNAUTHORIZED` and a 401 if not logged in

## Middleware Layers
First theres the `express.json()` middleware that makes it so only JSON requests are accepted. Then its the `cors({ credentials: true, origin: true })` which is used for cross origin request policy. after that, theres the `logger` middleware used for logging. then theres the `cookieParser()` and the name says it all. then we have:
```javascript
expressSession({
  secret: SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000*60*60*24*15
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI
  })
})
```

which is simply used for session storage. then we have the passport releated stuff:
```javascript
app.use(passport.initialize())
app.use(passport.session())
```

## TechStack
1. Express for RESTful API
2. MongoDB for Database
3. Passport.JS for authentication

## Authentication

Authorization is done through passport.js's local strategy. It works with a username and a password.<br/>
The password is hashed with bcrypt and salting.