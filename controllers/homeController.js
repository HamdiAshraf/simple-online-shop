const Product = require('../models/Product')


exports.getProducts = async (req, res, next) => {
    const validCategories = ['clothes', 'phones', 'computers']
    try {
        const products = await Product.find({});
        const category = req.query.category;
        const categories = await Product.find({ category });

        if (category && validCategories.includes(category)) {
            res.render('index', { products: categories, isUser: req.session.userId });
        } else {
            res.render('index', { products: products, isUser: req.session.userId });
        }


    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}