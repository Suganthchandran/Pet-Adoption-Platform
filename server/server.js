const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/AuthRoutes');
const connectDB = require('./src/config/DBconfig');

const app = express();
const PORT = process.env.PORT || 4005

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

connectDB();

app.use('/api/auth',authRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})