const express = require('express');
const jwt = require('jsonwebtoken');
const verifyUser = express.Router();
const authenticateUser = require('../middlewares/authenticate.js')
const userRegister = require('../schemas/userSchema')

verifyUser.get('/verify',authenticateUser ,async (req, res) => {
    //   console.log('dgderrr')
    try {
        // Retrieve the user data using the userId from the token
        const user = await userRegister.findById(req.userId);
        console.log(user)
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
     
        // Return the user data excluding the password
        const { username , image,  email } = user;
        res.status(200).json({ msg: 'Login Succesfully', data:{ 
            username,
            image,
            email
        } });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching user data' });
      }
})

module.exports = verifyUser