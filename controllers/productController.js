const Product = require('../models/Product');
const { validationResult } = require('express-validator');

exports.getProductById = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);


    const validationErrors = validationResult(req).array();

    res.render('product', { product: product, validationErrors: validationErrors, isUser: req.session.userId, isAdmin: req.session.isAdmin, pageTitle: 'Product' });
};

exports.getFirstProduct = async (req, res, next) => {
    const product = await Product.findOne({});


    const validationErrors = validationResult(req).array();

    res.render('product', { product: product, validationErrors: validationErrors, isUser: req.session.userId, isAdmin: req.session.isAdmin, pageTitle: 'First Product' });
};
