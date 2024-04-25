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
    description: joi.string(),
    updatedAt: new Date(),
    createdAt: new Date()
})

const carUpdateSchema = joi.object({
    plate: joi.string(), 
    manufacture: joi.string(), 
    model: joi.string(), 
    rentPerDay: joi.number(), 
    carSize: joi.string(), 
    capacity: joi.number(), 
    availableAt: joi.date(), 
    transmission: joi.string(), 
    year: joi.number(), 
    typeCars: joi.string(), 
    description: joi.string(),
    updatedAt: new Date()
})

const validateCreateInput = validator(carsInputSchema)
const validateUpdateInput = validator(carUpdateSchema)

module.exports = {validateCreateInput, validateUpdateInput}