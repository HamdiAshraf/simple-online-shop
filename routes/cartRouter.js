
const { Router } = require('express');

const { check } = require('express-validator')
const { isAuth } = require('../views/guards/auth.guard');
const { postCart, getItemsByUserId, postSave, postDelete, saveAll, deleteAll } = require('../controllers/cartController');

const router = Router();

router.get('/', isAuth, getItemsByUserId);

router.post('/', isAuth, [
    check('amount').notEmpty().withMessage('Amount must be provided')
        .isInt({ min: 1 }).withMessage('Amount must be greater than 0')
], postCart);

router.post('/save', isAuth, postSave);
router.post('/delete', isAuth, postDelete);

router.post('/save-all', isAuth, saveAll);
router.post('/delete-all', isAuth, deleteAll);



module.exports = router;
