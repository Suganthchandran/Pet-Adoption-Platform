const express = require('express');
const { adminLogin } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/admin', adminLogin);

module.exports = userRouter;
