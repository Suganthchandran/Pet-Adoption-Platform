const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./src/routes/AuthRoutes');
const connectDB = require('./src/config/DBconfig');
const AnimalRouter = require('./src/routes/AnimalRoutes');
const connectCloudinary   = require('./src/config/Cloudinary');

const app = express();
const PORT = process.env.PORT || 4005


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

connectDB();
connectCloudinary();

// app.use('/api/auth',authRouter)
app.use('/api/animal',AnimalRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})