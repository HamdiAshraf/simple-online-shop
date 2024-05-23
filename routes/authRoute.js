const { Router } = require('express')
const { check } = require('express-validator')
const { getLogin, getSignup, postLogin, postSignup, logout } = require('../controllers/authController')
const { isAuth, notAuth } = require('../views/guards/auth.guard')
const router = Router();



router.get('/login', notAuth, getLogin)
router.get('/signup', notAuth, getSignup)


router.post('/signup', notAuth, [
    check('username').notEmpty().withMessage('username must be provided'),
    check('email').isEmail().withMessage('invalid email format')
        .notEmpty().withMessage('email must be provided'),

    check('password').notEmpty().withMessage('password must be provided')
        .isLength({ min: 6 }).withMessage('password must be at least 6 characters'),

    check('confirmpassword')
        .custom((val, { req }) => {
            if (val === req.body.password) {
                return true
            } else {
                throw new Error("Passwords don't match");
            }
        })
        .notEmpty().withMessage('confirmpassword must be provided')

], postSignup)



router.post('/login', notAuth, [
    check('email').notEmpty().withMessage('email must be provided')
        .isEmail().withMessage('invalid email format'),

    check('password').notEmpty().withMessage('password must be provided')




], postLogin)


router.all('/logout', isAuth, logout)






module.exports = router;