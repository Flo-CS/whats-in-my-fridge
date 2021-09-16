const joi = require("joi");

const registerSchema = joi.object({
    email: joi.string().email().max(255).required(),
    password: joi.string().min(10).max(255).required()
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

module.exports = {registerSchema, loginSchema};