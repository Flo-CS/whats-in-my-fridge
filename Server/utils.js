const joi = require("joi")
const { schema } = require("./models/users.model")


const validateUser = (data) => {
    const userSchema = joi.object({
        email: joi.string().email().max(255).required(),
        password: joi.string().min(8).max(255).required()
    })

    return userSchema.validate(data)
}

module.exports = { validateUser }