const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const apiErr = require("../controllers/errorController")

const router = require("../router/index")

const app = express()

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs")

app.use(flash());
app.use(morgan("dev"));
app.use(session({ secret: "anastasia", saveUninitialized:true, resave: true}));
app.use(express.static(`${__dirname}/public`));

app.use(router)

app.use(apiErr.onError);
app.use(apiErr.onLost);