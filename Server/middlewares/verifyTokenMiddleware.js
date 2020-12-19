const jwt = require("jsonwebtoken")

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.body.token

    if (!token) return res.status(401).json({ error: "Access denied" })

    try {
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.tokenVerified = tokenVerified
        next()
    } catch (error) {
        res.status(401).json({ error: "Access denied" })
    }

}

module.exports = verifyTokenMiddleware