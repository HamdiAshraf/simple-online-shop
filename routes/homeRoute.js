const { Router } = require('express')
const { getProducts } = require('../controllers/homeController')
const router = Router();


router.get('/', getProducts)




module.exports = router;