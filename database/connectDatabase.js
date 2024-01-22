require('dotenv').config()
const mongoose = require('mongoose')

const DatabaseURL = process.env.MONGOURL;
const databaseConnect = async ()=>{
   try {
        await mongoose.connect(DatabaseURL)
        console.log('Connected to the Database')
   } catch (error) {
    console.error('Error Not Connect to Database');
    process.exit(0);
   }
}
module.exports = databaseConnect