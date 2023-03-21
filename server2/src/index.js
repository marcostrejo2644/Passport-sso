const express = require('express')
const passport = require('passport')
const path = require("path")
const cors = require('cors')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')

const routes = require('./api/index')
const mongoConnect = require('./services/mongoDB')

require('./auth/passportLocal')

require('dotenv').config()

mongoConnect()

require('dotenv').config()
const app = express()
const port = process.env.PORT || '8000'

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
}

if (app.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true
}

app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
)

app.set("views", path.join(__dirname, "views"));
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(expressSession(session))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use('/api/v1', routes)

app.listen(port, () => console.log(`Server on http://localhost:${port}`))
