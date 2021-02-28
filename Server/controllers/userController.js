const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("./../models/index");

const utils = require("../helpers/validation");

const registerUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate the user registration
    const registerValidation = utils.registerValidation({email, password});

    if (registerValidation.error)
        return res
            .status(400)
            .json({error: registerValidation.error.details[0].message});

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the user and the data documents
    try {
        const user = new models.User({
            email,
            password: hashedPassword,
        });
        await user.save();

        res.status(200).json({email});
    } catch (error) {
        res.status(500).json({error});
    }
};

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate the user login
    const loginValidation = utils.loginValidation({email, password});

    if (loginValidation.error)
        return res
            .status(400)
            .json({error: loginValidation.error.details[0].message});

    // Get the user corresponding to the email address
    const user = await models.User.findOne({email});

    if (!user)
        return res
            .status(401)
            .json({error: "There is no user with this email address"});

    // Compare stored hashed password and login password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
        return res.status(401).json({error: "The password is wrong"});

    const token = jwt.sign({email, id: user._id}, process.env.JWT_SECRET_KEY, {
        // TODO : Change the token expiration delay
        expiresIn: "30d"
    });

    res.cookie("token", token, {httpOnly: true})

    res.status(200).json({email});
};

const checkUserToken = async (req, res) => {
    // We just return that we are good here because the verifyTokenMiddleware do the rest

    // TODO: RETURN USER
    res.status(200).json();
};

const logoutUser = async (req, res) => {
    // In the future logout will be more advanced than a simple token deletion
    res.cookie("token", {maxAge: 0});
    res.status(200).json();
};

module.exports = {registerUser, loginUser, checkUserToken, logoutUser};
