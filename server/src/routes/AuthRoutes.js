const express = require('express');
const cors = require('cors');
const { registerController, loginUser, getProfile } = require('../controllers/AuthControllers');

const authRouter = express.Router();

authRouter.use(
    cors({
        credentials : true,
        origin : 'http://localhost:5173'
    })
)

authRouter.post('/login', loginUser);
authRouter.post('/register',registerController)
authRouter.get('/profile',getProfile)

module.exports = authRouter