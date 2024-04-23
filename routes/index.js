const router = require("express").Router()

const Auth = require("./authRoute")

router.use("/api/v1/auth", Auth)

module.exports = router