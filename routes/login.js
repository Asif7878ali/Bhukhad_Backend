const express = require('express')
const log = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const userRegister = require('../schemas/userSchema')
const JWT = require('jsonwebtoken')

log.post('/login', async (req, res) => {
   console.log('Node Data Login', req.body)
   
   try {
      const { email, password } = req.body
      const userExits = await userRegister.findOne({ email: email }).exec()

      if (userExits) {
         const checkPassword = await bcrypt.compare(password, userExits.password)
         if (checkPassword) {
            //Create a JWT Token
            const jwtToken = JWT.sign({ userID: userExits._id }, 'My_Secret_is_Private' , { expiresIn: '30h' })
            // console.log('grnta',jwtToken)
            res.status(200).json({ token: jwtToken })
         } else {
            res.status(400).json({ message: 'Auth error' })
         }

      } else {
         res.status(400).json({ message: 'Invalid email/password' })
      }
   } catch (error) {
      console.warn(error)
      res.status(500).json({ message: 'Internal Server Error' });
   }

})

module.exports = log