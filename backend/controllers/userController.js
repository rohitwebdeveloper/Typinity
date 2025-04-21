const typingProgressModel = require('../models/typingProgressModel')
const getfeedback = require('../services/getaifeedback')

const saveTypingProgress = async (req, res) => {
    const user = req.user;
    // const _id = '67fa1c8d91119b7a37b4bb3d'
    const { wpm, consistency, accuracy } = req.body;
    console.log(wpm, consistency, accuracy)
    const typingData = new typingProgressModel({
        user: user._id,
        wpm: wpm,
        accuracy: accuracy,
        consistency: consistency,
    })
    await typingData.save();
    return res.status(200).json({ success: true, message: 'Typing Progress Saved' })
}


const getTypingProgressData = async (req, res) => {
     const user = req.user;
    //  const _id = '67fa1c8d91119b7a37b4bb3d'
    const { range } = req.query;

    let filter = { user:user._id };

    if (range === '7') {
        const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filter.attempedAt = { $gte: fromDate };
    } else if (range === '30') {
        const fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        filter.attempedAt = { $gte: fromDate };
    }

    const progress = await typingProgressModel
        .find(filter)
        .populate('user', 'name email joinedAt');

    return res.status(200).json({ progress });
};


const generateTypingFeedback = async (req, res) => {
    // const user = req.user
    const {wpm, accuracy, consistency, correctCharaters, errorCharactors} = req.body;
    const feedback = await getfeedback(wpm, accuracy, consistency, correctCharaters, errorCharactors)
    if(!feedback) {
        return res.status(400).json({success:false, message:'Unable to provide feedback'})
    }
    return res.status(200).json({success:true, feedback})
}


module.exports = {
    saveTypingProgress,
    getTypingProgressData,
    generateTypingFeedback
};