// register.js
const express = require('express');
const bcrypt = require('bcryptjs');
const userRegister = require('../schemas/userSchema.js');
const upload = require('../middlewares/multer.js');

const register = express.Router();

// Signin Data and Save To MongoDb Database
register.post('/register', upload.single('image'), async (req, res) => {
  console.log('Node Data Sign', req.body);

  try {
    const { username, email, password } = req.body;
    const userExist = await userRegister.findOne({ email: email }).exec();

    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const profileImageBuffer = req.file.buffer;
      const profileImageBase64 = profileImageBuffer.toString('base64');
      //hash Password
      const hashPassword = await bcrypt.hash(password, 5);
      // Save user to MongoDB
      const newUser = new userRegister({
        username,
        email,
        password: hashPassword,
        image: profileImageBase64,
      });

      const document = await newUser.save();
      console.log('MongoDb Data', document);
      res.status(200).json({ message: 'Registration successful' });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = register;
