const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.typinityToken;
        // console.log(req.cookies.typinityToken)
        if (!token || token === "") {
            return res.status(401).json({ message: "You need to login first" })
        }
        const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)

        const user = await userModel.findOne({ email: decoded.email }).select('-password')
        if (!user) return res.status(401).json({ message: 'Invalid token or user not found' })
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        }
        next(error)
    }
}

module.exports = isLoggedIn;

