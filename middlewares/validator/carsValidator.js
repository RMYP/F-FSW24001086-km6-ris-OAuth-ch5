const joi = require("joi");

const validator = (schema) => (payload) => {
    const {error, value} = schema.validate(payload, {abortEarly: false});
    return {error, value}
}

const carsInputSchema = joi.object({
    plate: joi.string().required(), 
    manufacture: joi.string().required(), 
    model: joi.string().required(), 
    rentPerDay: joi.number().required(), 
    carSize: joi.string().default("Small").required(), 
    capacity: joi.number().required(), 
    availableAt: joi.date().required(), 
    transmission: joi.string().default("Automatic").required(), 
    year: joi.number().required(), 
    typeCars: joi.string().required(), 
    description: joi.string().default("Guest"),
    updatedAt: new Date(),
    createdAt: new Date()
})

const validateRegisterInput = validator(carsInputSchema)

module.exports = {validateRegisterInput}