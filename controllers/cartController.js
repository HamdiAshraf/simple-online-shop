const Cart = require('../models/Cart');
const { validationResult } = require('express-validator');

exports.getItemsByUserId = async (req, res, next) => {
    try {
        const items = await Cart.find({ userId: req.session.userId }).sort({ timestamp: 1 });
        const validationErrors = req.flash('validationErrors');
        res.render('cart', { items: items, validationErrors: validationErrors, isUser: true });
    } catch (err) {
        req.flash('authError', 'An error occurred. Please try again.');
        return res.redirect(req.body.redirectTo || '/');
    }
};

exports.postCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('validationErrors', errors.array());
        return res.redirect(req.body.redirectTo || '/');
    }

    try {
        const { itemId, amount } = req.body;
        const userId = req.session.userId;

        // Check if the item is already in the user's cart
        let cartItem = await Cart.findOne({ userId, itemId });

        if (cartItem) {
            // If the item already exists in the cart, update the amount
            cartItem.amount = parseInt(cartItem.amount) + parseInt(amount); // Ensure both values are interpreted as numbers
            await cartItem.save();
        } else {
            // If the item doesn't exist in the cart, create a new entry
            cartItem = new Cart({ userId, itemId, amount });
            await cartItem.save();
        }

        // Redirect to the cart page or any other appropriate action
        res.redirect('/cart');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('Internal server error');
    }
};

exports.postSave = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('validationErrors', errors.array());
            return res.redirect('/cart');
        } else {
            const item = await Cart.findByIdAndUpdate({ _id: req.body.itemId },

                { amount: req.body.amount, timestamp: Date.now() }
            )
            await item.save();
            res.redirect('/cart');
        }
    } catch (err) {
        console.error('Error saving cart item:', err);
        req.flash('authError', 'An error occurred. Please try again.');
        res.redirect('/cart');
    }
};



exports.postDelete = async (req, res, next) => {
    try {
        const itemId = req.body.itemId;
        await Cart.findByIdAndDelete(itemId);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
        req.flash('authError', 'An error occurred. Please try again.');
        res.redirect('/cart');
    }
};

exports.saveAll = async (req, res, next) => {
    try {
        const items = await Cart.find({ userId: req.session.userId });
        for (const item of items) {
            item.amount = req.body[item._id];
            await item.save();
        }
        res.redirect('/cart');
    } catch (error) {
        console.error('Error saving all items:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        await Cart.deleteMany({ userId: req.session.userId });
        res.redirect('/cart');
    } catch (error) {
        console.error('Error deleting all items:', error);
        res.status(500).send('Internal Server Error');
    }
};



