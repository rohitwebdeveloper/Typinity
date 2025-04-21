// import mysql from 'mysql2/promise';

// let connection;

// const databaseConnect = async () => {
//     if (connection) {
//         console.log('DB connection already exists');
//         return connection;
//     }
//     try {
//         connection = await mysql.createConnection({
//             host: process.env.DB_HOST || 'localhost',
//             user: process.env.DB_USER || 'root',
//             password: process.env.DB_PASSWORD || 'jarvis@123',
//             database: process.env.DB_NAME || 'rohitkushwaha_portfolio'
//         });
//         console.log('Database connected successfully');
//         return connection;
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         throw error;
//     }
// };

// export default databaseConnect;
