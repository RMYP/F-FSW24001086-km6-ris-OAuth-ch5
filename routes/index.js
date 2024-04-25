const router = require("express").Router()
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

router.use("/api-docs", swaggerUI.serve);
router.use("/api-docs", swaggerUI.setup(swaggerDocument));

const Auth = require("./authRoute")
const Car = require("./carRoute")

router.use("/api/v1/auth", Auth)
router.use("/api/v1/car", Car)

module.exports = router