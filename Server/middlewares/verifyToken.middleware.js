const jwt = require("jsonwebtoken")

const verifyTokenMiddleware = (req, res, next) => {
    // The token is stored in the header
    const token = req.headers["authorization"]

    if (!token) return res.status(401).json({error: "Access denied"})

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.verifiedToken = verifiedToken
        next()
    } catch (error) {
        res.status(401).json({error: "Access denied"})
    }

}

module.exports = verifyTokenMiddleware