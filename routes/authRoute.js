const router = require("express").Router();

const Auth = require("../controllers/userController");
const Authenticate = require("../middlewares/authenticate");

router.post("/login", Authenticate, Auth.login)

module.exports = router