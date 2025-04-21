const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const asyncHandler = require('../utils/asyncHandler')
const {saveTypingProgress, getTypingProgressData, generateTypingFeedback} = require('../controllers/userController')


router.post('/save', isLoggedIn, asyncHandler(saveTypingProgress))

router.get('/user', isLoggedIn, asyncHandler(getTypingProgressData))

router.post('/feedback', asyncHandler(generateTypingFeedback))


module.exports = router;
