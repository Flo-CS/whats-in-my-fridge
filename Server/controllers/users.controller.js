// Libraries & cie
const bcrypt = require("bcryptjs")

// Models
const Users = require("./../models/users.model")

// Utils
const utils = require("./../utils")

const registerUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Validate the user
    const userValidation = utils.validateUser({ email, password })

    if (userValidation.error) return res.status(400).json({ error: userValidation.error.details[0].message })

    // Verify if the email address is not already used
    const isUserAlreadyExists = await Users.findOne({ email })

    if (isUserAlreadyExists) return res.status(400).json({ error: "User already exists" })

    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    // Create the user
    try {
        const user = new Users({
            email,
            password: hashedPassword
        })

        const savedUser = await user.save()
        res.status(200).json({ email: savedUser.email, id: savedUser._id })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const loginUser = async (req, res) => {

}

module.exports = { registerUser }