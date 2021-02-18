const jwt = require("jsonwebtoken")

const verifyTokenMiddleware = (req, res, next) => {
    // Get the token from the cookies
    const token = req.cookies.token

    if (!token) return res.status(401).json({error: "Access denied"})

    try {
        req.verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        next()
    } catch (error) {
        res.status(401).json({error: "Access denied"})
    }

}

module.exports = verifyTokenMiddleware