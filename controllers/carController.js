const ApiError = require("../utils/apiError")
const {car} = require("../models")
const imagekit = require("../lib/imagekit");
const validator = require("../middlewares/validator/carsValidator")

const uploadImagekit = async (files) =>{
    let image
    if(files){
        return new Promise ((resolve, reject) => {
            files.map(async (file) => {
                const split = file.originalname.split(".");
                const extension = split[split.length - 1];
    
                const uploadImg = await imagekit.upload({
                    file: file.buffer,
                    fileName: `file_${crypto.randomUUID()}.${extension}`
                })
                image = uploadImg.url
                if(image){
                    resolve(image)
                }else if(!image) console.log("There is no value")
            })
        })
    }
}

const getAllCar = async (req, res, next) => {
    try {
        const carData = await car.findAll()
        res.status(200).json({
            status: "Success",
            carData
        })
    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}

const createCar = async (req, res, next) => {
    try {
        const {error, value} = validator.validateRegisterInput(req.body)
        if(error) return next(new ApiError(error, 400))
        const files = req.files
        console.log(files)
        
        const image = await uploadImagekit(req.files).then((imageLink) => {value.image = imageLink}) 
        console.log(value)
        const NewCar = await car.create(value)

        res.status(201).json({
            status: "success",
            book: NewCar
        })

    } catch (error) {
        next(new ApiError(error.message, 500))
    }
}




module.exports = {getAllCar, createCar}