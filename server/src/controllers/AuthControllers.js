const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../modals/userModals");
const jwt = require('jsonwebtoken')


const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({
                error : `User not found`
            })
        }

        const match = await comparePassword(password,user.password);

        if(match) {
            jwt.sign({email:user.email, id:user._id, name:user.name}, process.env.JWT_SECRET_KEY,{},(err,token)=> {
                if(err)
                    throw err;
                res.cookie('token',token).json(user);
            })
        }
        else {
            res.json({
                error : `Password is Incorrect`
            })
        }

    }
    catch (error) {
        console.log(error);
    }
}

const registerController = async (req,res) => {
    try {
        const {name,email,password} = req.body;

        if(!name) {
            return res.json({
                error : `Name is required`
            })
        };

        if(!email) {
            res.json({
                error : `Email is required`
            })
        }

        if(!password || password.length < 6) {
            return res.json({
                error : `Password is required and should be at least 6 character long`
            })
        }

        const exist = await userModel.findOne({email});

        if(exist) {
            return res.json({
                error : `Email is Already taken`
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await userModel.create({
            name,
            email,
            password : hashedPassword
        })
        return res.json(user);
    }
    catch (error) {
        console.log(error);
    }
}

const getProfile = (req,res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET_KEY,{},(err,user)=>{
            if(err) 
                throw err;
            res.json(user);
        })
    }
    else {
        res.json(null)
    }
}

module.exports = {
    loginUser,registerController,getProfile
}