const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



authController.post('/register',async(req,res)=>{
    try {
           const isExsiting = await User.findOne({email:req.body.email})
        if(isExsiting){
            throw new Error("Already such an account with this email. try a new one.!")
        }

        const hashedPassword = await bcrypt.hash(req.body.password,10)
        console.log(hashedPassword)

        const newUser = await User.create({...req.body, password: hashedPassword})
        const {password,...others} = newUser._doc
        console.log(others)

        const token = jwt.sign({id:newUser._id,isAdmin: newUser.isAdmin}, process.env.JWT_SECRET,{expiresIn: '5h'})

        return res.status(201).json({...others,token})
    } catch (error) {
        return res.status(500).json(error.message)
    }

})

// login
authController.post('/login', async(req, res) => {
    try {
       const user = await User.findOne({email: req.body.email}) 
       if(!user){
          throw new Error("User credentials are wrong!")
       }

       // 123456, [lkoiuytfdrse5rd6tfgyhikojiugyftdrzsdxtfycghu]]
       const comparePass = await bcrypt.compare(req.body.password, user.password)
       if(!comparePass){
        throw new Error("User credentials are wrong!")
       }

       const {password, ...others} = user._doc
       const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})

       return res.status(200).json({others, token})
    } catch (error) {
        return res.status(500).json(error.message) 
    }
})

module.exports = authController