const { Router } = require('express')
const { getLogin, getSignup, postLogin, postSignup, logout } = require('../controllers/authController')
const router = Router();



router.get('/login', getLogin)
router.get('/signup', getSignup)


router.post('/signup', postSignup)
router.post('/login', postLogin)


router.all('/logout', logout)






module.exports = router;