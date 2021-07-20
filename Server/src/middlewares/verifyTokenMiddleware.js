const jwt = require("jsonwebtoken");
const {AuthError} = require("../helpers/errors");
const {authErrors} = require("../helpers/errors");

function verifyTokenMiddleware() {
    return (req, res, next) => {
        // Get the token from the cookies
        const token = req.cookies.token;

        if (!token) return next(new AuthError(authErrors.invalidToken));

        try {
            req.verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch (error) {
            return next(new AuthError(authErrors.invalidToken));
        }

    };
}


module.exports = verifyTokenMiddleware;