const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/DBconfig');
const AnimalRouter = require('./src/routes/AnimalRoutes');
const connectCloudinary   = require('./src/config/Cloudinary');
const ProductRouter = require('./src/routes/productRoutes');
const userRouter = require('./src/routes/userRoute');
const AdoptRouter = require('./src/routes/AdoptRoute');
const usersRouter = require('./src/routes/users');
const OrderRoute = require('./src/routes/OrderRoute');

const app = express();
const PORT = process.env.PORT || 4005


const allowedOrigins = [
  'https://cuddly-animalia-society.onrender.com',
  ...Array.from({ length: 65535 }, (_, i) => `http://localhost:${i + 1}`)
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
app.use('/api/orders', OrderRoute);
app.use('/api/adopt', AdoptRouter)
app.use('/api', usersRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})