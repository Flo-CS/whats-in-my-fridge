const joi = require("joi")

// TODO : Add custom messages
const registerValidation = (data) => {
    const registerSchema = joi.object({
        email: joi.string().email().max(255).required(),
        password: joi.string().min(8).max(255).required()
    })

    return registerSchema.validate(data)
}
const loginValidation = (data) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    return loginSchema.validate(data)
}


module.exports = {registerValidation, loginValidation}