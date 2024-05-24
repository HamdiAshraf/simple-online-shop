const { Router } = require('express')
const { getProductById, getFirstProduct } = require('../controllers/productController')
const { check } = require('express-validator')

const router = Router();


router.get('/', [
    check('amount').notEmpty().withMessage('amount must be provided')
        .isInt({ min: 1 }).withMessage('amount must be greater than 0')
], getFirstProduct)
router.get('/:id', [
    check('amount').notEmpty().withMessage('amount must be provided')
        .isInt({ min: 1 }).withMessage('amount must be greater than 0')
], getProductById)


module.exports = router;