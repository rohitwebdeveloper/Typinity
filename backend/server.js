const app = require('./app')
const databaseConnection = require('./config/db')
const port = process.env.PORT || 8000;


(async () => {
    try {
        await databaseConnection();
        console.log('Connected to database')
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();