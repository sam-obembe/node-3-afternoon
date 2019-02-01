require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const middle = require("./middlewares/checkForSession")
const swag = require("./controllers/swag_controller")
const auth = require("./controllers/auth_controller")
const cart = require("./controllers/cart_controller")
const search = require("./controllers/search_controller")
const app = express()
const port = process.env.SERVER_PORT


app.use(bodyParser.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(middle.checkForUser)

app.get("/api/swag", swag.read)

//user authentication
app.post("/api/login", auth.login)
app.post("/api/register", auth.register)
app.post("/api/signout", auth.signout)
app.get("/api/user", auth.getUser)

//cart check
app.post("/api/cart", cart.add);
app.post("/api/cart/checkout", cart.checkout);
app.delete("/api/cart", cart.delete)

app.get("/api/search", search.search)


app.listen(port, console.log(`listening on port ${port}`))