# Server Docs

<p style="color:#F64444">IMPORTANT!!!! This app is supposed to be a shitty app made in 15~ hours</p>

## Database

For the db we used mongodb and mongoose (ORM). interaction with the db is done through these steps:

1. User request / Cron Job
2. Server Request Handling
3. Interactors (See [This](https://medium.com/expedia-group-tech/onion-architecture-deed8a554423))
4. Mongoose
5. MongoDB Driver

## SubSchemas

SubSchemas are fields that can be put together to create a schema that can be used to enforce certain field types or styles on request params, bodies and queries.

### Post Batch

1. Must be numeric: `ERR_BATCH_NUMERIC`
2. Must be an integer: `ERR_BATCH_INTEGER`

### Post Content

1. Must be a string: `ERR_CONTENT_STRING`
2. Must not be empty: `ERR_CONTENT_EMPTY`
3. Length must be between 10-500 characters: `ERR_CONTENT_LEN_MIN10_MAX500`

### Post UID

1. Must be a string: `ERR_POST_UID_STRING`
2. Length must be 36: `ERR_POST_UID_LEN_36`

### Username

1. Must be a string: `ERR_USERNAME_STRING`
2. Must not be empty: `ERR_USERNAME_EMPTY`
3. Length must be between 3-16 characters: `ERR_USERNAME_LEN_MIN3_MAX16`

### Password

1. Must be a string: `ERR_PASSWORD_STRING`
2. Must not be empty: `ERR_PASSWORD_EMPTY`
3. Length must be between 6-24 characters: `ERR_PASSWORD_LEN_MIN6_MAX24`

## User ID

1. Must be a string: `ERR_ID_STRING`
2. Must be a length of 24: `ERR_ID_LEN_24`

## API Usage

### POST /api/auth/

This endpint accepts a `username: Username` and `password: Password` in a json format. if the user is present in the db but the passwords dont match, a `ERR_PASSWORD_WRONG` will be thrown. if anything unexpected happens, `ERR_UNEXPECTED` gets thrown. you will get a 200 if it was successful.

### GET /api/auth/status/

This endpoint returns the public user profile object of the currently logged in user. will return 401 in case you are unauthorized and a `ERR_UNAUTHORIZED` will be thrown.

### GET /api/auth/logout/

This endpoint logs out the current user. throws `ERR_UNAUTHORIZED` and a 401 if not logged in.

### POST /api/posts/

This endpoint takes in a `content: Post Content` body field and creates a post and returns it. throws `ERR_UNAUTHORIZED` and a 401 if not logged in. throws `ERR_UNEXPECTED` and 400 if anything unexpected happens.

### DELETE /api/posts

This endpoint takes in a `uid: Post UID` body field and deletes the specified post. Will throw a `ERR_UNAUTHORIZED` if not logged in. will throw a `ERR_POST_OWNERSHIP` if you are not the post author. Will throw a `ERR_UNEXPECTED` if something unexpected happens.

### GET /api/posts/:batch/

This endpoint takes in a `batch: Post Batch` parameter and returns a batch of posts (size = 50). throws `ERR_UNAUTHORIZED` and a 401 if not logged in.

### GET /api/user/id/:id

This endpoint takes in an `id: User ID` parameter and returns a user. throws `ERR_UNAUTHORIZED` and a 401 if not logged in. throws a `ERR_USER_NOTFOUND` if the requested user was not found in the DB. throws a `ERR_UNEXPECTED` if anything unexpected happens with a status code of 500

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