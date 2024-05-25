const Product = require('../models/Product')

const { validationResult } = require('express-validator')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash('validationErrors') || [],
        isUser: true,
        isAdmin: true
    });
};

exports.postAddProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect('/admin/add');
    }

    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file ? req.file.filename : ''
        });

        await newProduct.save();
        res.redirect('/admin/products'); // Redirect to the product list page after successful save
    } catch (err) {
        next(err);


    }
};


exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('products', {
            products: products,
            isUser: true,
            isAdmin: true
        });
    } catch (err) {
             next(err);

    }
};
exports.getDashboard = async (req, res, next) => {
    try {
        // Fetch any necessary data for the dashboard, e.g., statistics, recent activity, etc.
        const productCount = await Product.countDocuments();
        res.render('dashboard', {
            productCount: productCount,
            isUser: true,
            isAdmin: true
        });
    } catch (err) {
        next(err);

    }
};


exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.redirect('/admin/products');
    } catch (err) {
        next(err);

    }
};


exports.getEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.render('edit-product', { product, isUser: req.session.isUser, isAdmin: req.session.isAdmin });
    } catch (error) {
        next(error);

    }
};



exports.updateProduct = async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        await Product.findByIdAndUpdate(req.params.productId, { name, price, category, description });
        res.redirect('/admin/products');
    } catch (error) {
     next(error);
    }
};