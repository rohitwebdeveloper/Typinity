const jwt = require('jsonwebtoken')

const generateToken = async (email, userid) => {
    try {
        const token = await jwt.sign({ email: email, userid: userid }, process.env.JWT_PRIVATE_KEY)
        if (token) return token;
    } catch (error) {
       throw new Error('Failed to generate token');
    }
}

module.exports = generateToken