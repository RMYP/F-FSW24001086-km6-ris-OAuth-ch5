const express = require("express");
const cors = require("cors");
const path = require("path")
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const apiErr = require("../controllers/errorController")
const publicPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, "..", "views")
const bodyParser = require("body-parser")

const router = require("../routes/index")

const app = express()
app.use(express.static(publicPath));
// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// ejs
app.set("views", viewsPath);
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.use(flash());
app.use(morgan("dev"));
app.use(session({ secret: "anastasia", saveUninitialized:true, resave: true}));


app.use(router)

app.use(apiErr.onError);
app.use(apiErr.onLost);

module.exports = app