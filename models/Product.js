const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
})

module.exports = mongoose.model('Product', ProductSchema);