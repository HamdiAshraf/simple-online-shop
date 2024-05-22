const Product = require('../models/Product')

exports.getProductById = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('product', { product: product })
}


exports.getFirstProduct = async (req, res, next) => {
    const product = await Product.findOne({})

    res.render('product', { product: product })
}