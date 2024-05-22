const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getSignup = async (req, res) => {
    res.render('signup', { errorMessage: null });
}


exports.getLogin = async (req, res, next) => {
    res.render('login', {
        errorMessage: null
    });
}



exports.postSignup = async (req, res, next) => {
    const { email, username, password, confirmpassword } = req.body;

    // Check if password and confirm password match
    if (password !== confirmpassword) {
        return res.render('signup', {
            errorMessage: 'Passwords do not match.',
            email: email,
            username: username
        });
    }
    if (!email || !password || !confirmpassword || !username) {
        return res.render('signup', {
            errorMessage: 'All fields are required.',
            email: email,
            username: username
        });
    }

    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.render('signup', {
                errorMessage: 'User already exists. Please login or use a different email.',
                email: email,
                username: username
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                email,
                password: hashedPassword,
            });

            await user.save();
            res.redirect('/auth/login');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};


exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.render('login', {
                errorMessage: 'Email and password fields cannot be empty.',
                email: email
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', {
                errorMessage: 'There is no user matching this email.',
                email: email
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {
                errorMessage: 'Incorrect password.',
                email: email
            });
        }

        req.session.userId = user._id;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
};



exports.logout = async (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}


