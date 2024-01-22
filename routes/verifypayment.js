const express = require('express')
const crypto = require('crypto')
const verifySignature = express.Router()

verifySignature.post('/checkout/verify' , (req , res) =>{
      console.log(req.body)
      try {
        const body = req.body.responce.razorpay_order_id + '|' + req.body.responce.razorpay_payment_id

        const expectsign = crypto.createHmac('sha256' , process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest('hex')

        if (expectsign === req.body.responce.razorpay_signature) {
            res.status(200).json({ msg : 'Signature is Valid'})
        } else {
            res.status(500).json({ msg : 'InValid Sign'})
        }
        
      } catch (error) {
         console.log('dfg', error)
         res.json(400).json('Internal Server Error')
      }
    
})

module.exports = verifySignature