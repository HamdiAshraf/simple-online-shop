const mongoose = require('mongoose')


const CartSchema = new mongoose.Schema({
    name: String,
    price: String,
    amount: String,
    userId: String,
    productId: String,
    timestamp: String,
})


module.exports = mongoose.model('Cart', CartSchema)