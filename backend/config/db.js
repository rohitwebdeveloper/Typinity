const mongoose = require('mongoose')

const databaseConnection = async () => {
        await mongoose.connect(process.env.DATABASE_URL)
}

module.exports = databaseConnection;