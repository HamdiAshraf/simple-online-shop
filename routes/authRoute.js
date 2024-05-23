const { Router } = require('express')
const { check } = require('express-validator')
const { getLogin, getSignup, postLogin, postSignup, logout } = require('../controllers/authController')
const router = Router();



router.get('/login', getLogin)
router.get('/signup', getSignup)


router.post('/signup', [
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



router.post('/login', [
    check('email').notEmpty().withMessage('email must be provided')
    .isEmail().withMessage('invalid email format'),

    check('password').notEmpty().withMessage('password must be provided')

    .isLength({ min: 6 }).withMessage('password must be at least 6 characters'),


],postLogin)


router.all('/logout', logout)






module.exports = router;