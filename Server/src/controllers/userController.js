const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../models");

const utils = require("../helpers/validation");
const {AuthError} = require("../helpers/errors");
const {authErrors} = require("../helpers/errors");
const {databaseErrors} = require("../helpers/errors");
const {DatabaseError} = require("../helpers/errors");
const {validationErrors} = require("../helpers/errors");
const {ValidationError} = require("../helpers/errors");

const registerUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate the user registration
    const registerValidation = utils.registerValidation({email, password});


    if (registerValidation.error) {
        const errorMessage = registerValidation.error.details[0].message;
        return next(new ValidationError(validationErrors.authValidationFailed, errorMessage));
    }

    // Get the user corresponding to the email address if he exists
    const user = await models.User.findOne({email});

    // Cancel if the user already exists
    if (user)
        return next(new AuthError(authErrors.userAlreadyExists));

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the user and the data documents

    const newUser = new models.User({
        email,
        password: hashedPassword,
    });

    await newUser.save().catch(() => {
        return next(new DatabaseError(databaseErrors.save));
    });

    res.status(200).json({email});

};

const loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate the user login
    const loginValidation = utils.loginValidation({email, password});


    if (loginValidation.error) {
        const errorMessage = loginValidation.error.details[0].message;
        return next(new ValidationError(validationErrors.authValidationFailed, errorMessage));
    }

    // Get the user corresponding to the email address
    const user = await models.User.findOne({email});

    if (!user)
        return next(new AuthError(authErrors.userNotFound));

    // Compare stored hashed password and login password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
        return next(new AuthError(authErrors.invalidPassword));

    const token = jwt.sign({email, id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d"
    });

    res.cookie("token", token, {httpOnly: true, sameSite: "None", secure: true, maxAge: 10 * 24 * 60 * 60 * 1000});

    res.status(200).json({email});
};

const checkUserToken = async (req, res) => {
    // We just return that we are good here because the verifyTokenMiddleware do the rest

    // TODO: RETURN USER
    res.status(200).json();
};

const logoutUser = async (req, res) => {
    // In the future logout will be more advanced than a simple token deletion
    res.cookie("token", undefined, {maxAge: 0, sameSite: "None", secure: true});
    res.status(200).json();
};

module.exports = {registerUser, loginUser, checkUserToken, logoutUser};
