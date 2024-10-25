const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/DBconfig');
const AnimalRouter = require('./src/routes/AnimalRoutes');
const connectCloudinary   = require('./src/config/Cloudinary');
const ProductRouter = require('./src/routes/productRoutes');
const userRouter = require('./src/routes/userRoute');

const app = express();
const PORT = process.env.PORT || 4005


const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

connectDB();
connectCloudinary();

app.use('/api/animal',AnimalRouter)
app.use('/api/product',ProductRouter)
app.use('/api/user', userRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})