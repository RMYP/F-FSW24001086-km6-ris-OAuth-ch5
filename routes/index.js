const router = require("express").Router()

const Auth = require("./authRoute")
const Car = require("./carRoute")

router.use("/api/v1/auth", Auth)
router.use("/api/v1/car", Car)

module.exports = router