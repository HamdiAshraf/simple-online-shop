const { Router } = require('express')
const { getAddProduct } = require('../controllers/adminController')
const { isAdmin } = require('../views/guards/admin.guard')
const router = Router()

router.get('/add', isAdmin, getAddProduct)


module.exports = router;