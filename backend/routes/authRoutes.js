const express = require('express');
const router = express.Router();
const {userSignUp, userSignIn, deleteAccount, checkAuth, forgotPassword, verifyOtp, createNewPassword} = require('../controllers/authController')
const asyncHandler = require('../utils/asyncHandler')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/sign-up', asyncHandler(userSignUp))

router.post('/sign-in', asyncHandler(userSignIn))

router.get('/check-auth', isLoggedIn, asyncHandler(checkAuth))

router.post('/forgot-password', asyncHandler(forgotPassword))

router.post('/verify-otp', asyncHandler(verifyOtp))

router.patch('/reset-password', asyncHandler(createNewPassword))

router.delete('/delete-account', isLoggedIn, asyncHandler(deleteAccount))

module.exports = router;