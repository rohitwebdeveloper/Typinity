const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middlewares/errorHandler')


// Initializing express app
const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL, 
    credentials: true,
    exposedHeaders: ["Set-Cookie"]
  }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/typing', userRoutes);

// Global error handler
app.use(errorHandler)


// getfeedback();




module.exports = app;