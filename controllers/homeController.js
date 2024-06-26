const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
    const validCategories = ['clothes', 'phones', 'computers'];
    try {
        const products = await Product.find({});
        const category = req.query.category;
        const categories = await Product.find({ category });

        const validationErrors = req.flash('validationErrors') || [];

        if (category && validCategories.includes(category)) {
            res.render('index', {
                products: categories,
                isUser: req.session.userId,
                validationErrors: validationErrors,
                isAdmin: req.session.isAdmin,
                pageTitle:'Home'
            });
        } else {
            res.render('index', {
                products: products,
                isUser: req.session.userId,
                validationErrors: validationErrors,
                isAdmin: req.session.isAdmin,
                pageTitle:'Home'
            });
        }

    } catch (err) {
        next(err);

    }
};
