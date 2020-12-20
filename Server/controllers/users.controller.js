// Libraries & cie
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Models
const Users = require("./../models/users.model")
const UsersData = require("../models/usersData.model")

// Utils
const utils = require("./../utils")

const registerUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Validate the user registration
    const registerValidation = utils.registerValidation({ email, password })

    if (registerValidation.error) return res.status(400).json({ error: registerValidation.error.details[0].message })

    // Verify if the email address is not already used
    const isUserAlreadyExists = await Users.findOne({ email })

    if (isUserAlreadyExists) return res.status(400).json({ error: "User with this email address already exists" })

    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    // Create the user and the data documents
    try {
        const user = new Users({
            email,
            password: hashedPassword
        })

        const savedUser = await user.save()

        const userData = new UsersData({ userId: user._id, products: [] })

        await userData.save()

        res.status(200).json({ email: savedUser.email, id: savedUser._id })

    } catch (error) {
        res.status(500).json({ error })
    }
}

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Validate the user login
    const loginValidation = utils.loginValidation({ email, password })

    if (loginValidation.error) return res.status(400).json({ error: loginValidation.error.details[0].message })

    // Get the user corresponding to the email address
    const user = await Users.findOne({ email })

    if (!user) return res.status(401).json({ error: "There is no user with this email address" })

    // Compare stored hashed password and login password
    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) return res.status(401).json({ error: "The password is wrong" })

    const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" })

    res.status(200).json({ token })
}

module.exports = { registerUser, loginUser }