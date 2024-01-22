const express = require('express')
const Razorpay = require('razorpay')
const checkout = express.Router()

checkout.post('/checkout/session', async (req, res) => {
    console.log(req.body)
   
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY
        });

        const totalAmount = req.body.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0) * 100;

        const order = await razorpay.orders.create({
            amount: totalAmount,
            currency: 'INR',
            payment_capture: 1,
        });

        if (!order) {
            res.status(301).json({ msg: 'order not created' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.log('Error in catch block', error);
        res.status(400).json({ msg: 'Internal server error' });
    }

})

module.exports = checkout