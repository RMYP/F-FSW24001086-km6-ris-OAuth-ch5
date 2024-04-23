const router = require("express").Router();

const Auth = require("../controllers/userController");
const Authenticate = require("../middlewares/authenticate");

router.post("/login", Auth.login)
router.post("/register", Authenticate, Auth.register)

module.exports = router