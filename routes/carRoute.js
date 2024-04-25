const router = require("express").Router()
const upload = require("../middlewares/uploader")
const Car = require("../controllers/carController")

router.post("/",upload.array("images"),  Car.createCar)
router.get("/", Car.getAllCar)

module.exports = router