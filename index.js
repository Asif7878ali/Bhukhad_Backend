require('dotenv').config()
const express = require('express')
const server = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const databaseConnect = require('./database/connectDatabase.js');
const register = require('./routes/register.js')
const log = require('./routes/login.js')
const verifyUser = require('./routes/verifyuser.js');
const checkout = require('./routes/checkout.js')
const verifySignature = require('./routes/verifypayment.js')
require('dotenv').config()

// Use CORS middleware
server.use(cors());
server.use(bodyParser.json());

const port = process.env.PORT || 5000

//Cheking for home route is fine or not
server.get('/', (req, res) => {
  res.send('All is Working Fine')
})
 
// Signin Data and Save To MongoDB Database
server.use(register)

// Login Data
server.use(log)
 
// verify user token
server.use(verifyUser)

//checkout to payment
server.use(checkout)

//verify the payment
server.use(verifySignature)

 databaseConnect().then(() => { 
   server.listen(port, () => {
       console.log(`server is running on port ${port}`)
   })
});