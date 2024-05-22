const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res) => {
    res.render('signup', {
        authError: req.flash('authError')[0]
    });
};

exports.getLogin = (req, res) => {
    res.render('login', {
        authError: req.flash('authError')[0]
    });
};

exports.postSignup = async (req, res, next) => {
    const { email, username, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        req.flash('authError', 'Passwords do not match.');
        return res.render('signup', {
            authError: req.flash('authError')[0],
            email: email,
            username: username
        });
    }
    if (!email || !password || !confirmpassword || !username) {
        req.flash('authError', 'All fields are required.');
        return res.render('signup', {
            authError: req.flash('authError')[0],
            email: email,
            username: username
        });
    }

    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            req.flash('authError', 'User already exists. Please login or use a different email.');
            return res.render('signup', {
                authError: req.flash('authError')[0],
                email: email,
                username: username
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.redirect('/auth/login');
    } catch (err) {
        req.flash('authError', 'An error occurred. Please try again.');
        return res.render('signup', {
            authError: req.flash('authError')[0],
            email: email,
            username: username
        });
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            req.flash('authError', 'Email and password fields cannot be empty.');
            return res.render('login', {
                authError: req.flash('authError')[0],
                email: email
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            req.flash('authError', 'There is no user matching this email.');
            return res.render('login', {
                authError: req.flash('authError')[0],
                email: email
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('authError', 'Incorrect password.');
            return res.render('login', {
                authError: req.flash('authError')[0],
                email: email
            });
        }

        req.session.userId = user._id;
        res.redirect('/');
    } catch (err) {
        req.flash('authError', 'An error occurred. Please try again.');
        return res.render('login', {
            authError: req.flash('authError')[0],
            email: email
        });
    }
};


exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
