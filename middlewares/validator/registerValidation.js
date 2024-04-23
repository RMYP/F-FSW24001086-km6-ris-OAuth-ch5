const joi = require("joi");

const validator = (schema) => (payload) => {
    const {error, value} = schema.validate(payload, {abortEarly: false});
    return {error, value}
}

const registerInputSchema = joi.object({
    name: joi.string().required(), 
    email: joi.string().required(), 
    password: joi.string().min(8).required(), 
    city: joi.string().required(), 
    address: joi.string().required(), 
    phone: joi.string().required(), 
    role: joi.string().default("Guest"),
})

const validateRegisterInput = validator(registerInputSchema)

module.exports = {validateRegisterInput}