const {Router}=require('express')
const{getProductById,getFirstProduct}=require('../controllers/productController')
const router=Router();


router.get('/',getFirstProduct)
router.get('/:id',getProductById)


module.exports=router;