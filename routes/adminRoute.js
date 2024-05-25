const multer = require('multer');
const { Router } = require('express');
const { getAddProduct, postAddProduct, getProducts, getDashboard, deleteProduct, getEditProduct, updateProduct } = require('../controllers/adminController');
const { isAdmin } = require('../views/guards/admin.guard');
const { check } = require('express-validator');
const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});

router.get('/add', isAdmin, getAddProduct);

router.post('/add', isAdmin,
    upload.single('image'),
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
        check('category').notEmpty().withMessage('Category is required'),
        check('description').notEmpty().withMessage('Description is required'),
        check('image').custom((val, { req }) => {
            if (req.file) {
                return true;
            } else {
                throw new Error('Image field is required');
            }
        })
    ],
    postAddProduct
);

router.get('/products', getProducts);
router.get('/dashboard', getDashboard);


router.post('/products/:productId', isAdmin, deleteProduct);


router.get('/products/:productId/edit', isAdmin, getEditProduct);

router.post('/products/:productId/edit', isAdmin, updateProduct);

module.exports = router;
