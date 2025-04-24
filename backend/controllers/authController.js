const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const { emailRegex, passwordRegex } = require('../utils/validation')
const sendVerificationMail = require('../utils/sendMail')
const otpModel = require('../models/otpModel')


const userSignUp = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: 'Invalid email format' })
    if (!passwordRegex.test(password)) return res.status(400).json({ success: false, message: 'Weak Password' })

    const userexist = await userModel.findOne({ email: email })
    if (userexist) {
        return res.status(400).json({ message: 'This account already exists' })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
        name: fullname,
        email: email,
        password: hashedPassword,
    })
    await newUser.save();
    const token = await generateToken(newUser.email, newUser._id)
    res.cookie('typinityToken', token, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false,
        maxAge: 86400000,
        // path: '/',
    });
    return res.status(201).json({ success: true, message: "Sign-up successful" });
}


const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid Email' })
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        return res.status(400).json({ success: false, message: 'Invalid Password' })
    } else {
        let token = await generateToken(user.email, user._id)
        res.cookie('typinityToken', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            maxAge: 86400000,
        });
        return res.status(200).json({ success: true, message: 'Sign-In Successful' })
    }
}



const checkAuth = async (req, res) => {
    const user = req.user;
    if (user) return res.status(200).json({ success: true, user });
}



const deleteAccount = async (req, res) => {
    const user = req.user;
    const deletedUser = await userModel.deleteOne({ email: user.email })
    if (deletedUser.deletedCount === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: 'Account deleted successfully' })
}



const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!emailRegex.test(email)) return res.status(400).json({ success: false, message: 'Invalid email format' })

    const verifyemail = await userModel.findOne({ email: email })
    if (!verifyemail) return res.status(200).json({ success: false, message: 'OTP sent to your email if account exists' })

    const otp = Math.floor(100000 + Math.random() * 900000)
    const newotp = await otpModel.findOneAndUpdate(
        { email: verifyemail.email },
        { otp: otp },
        { upsert: true, new: true }
    )
    if (!newotp) return res.status(500).json({ success: false, message: 'Failed Generate OTP' })
    await sendVerificationMail(verifyemail.email, otp)
    return res.status(200).json({ message: 'OTP sent to your email if account exists' });
}



const verifyOtp = async (req, res) => {
    const {email, otp } = req.body;
    if (!otp) {
        return res.status(400).json({ message: "OTP is required." });
    }
    const otpdetail = await otpModel.findOne({ email: email })

    if (!otpdetail) {
        return res.status(404).json({ success: false, message: "OTP has expired." });
    }

    if (otpdetail.otp === otp) {
        return res.status(200).json({ success: true, message: 'OTP Verified' })
    } else {
        return res.status(401).json({ success: false, message: 'Invalid OTP' })
    }
}



const createNewPassword = async (req, res) => {
    const { email, confirmPassword } = req.body;
    if (!confirmPassword) {
        return res.status(400).json({ message: "Password is required." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(confirmPassword, salt);
    const updatedUser = await userModel.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true })
    
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "Password updated successfully." });
}



module.exports = {
    userSignUp,
    userSignIn,
    checkAuth,
    deleteAccount,
    forgotPassword,
    verifyOtp,
    createNewPassword,
}

