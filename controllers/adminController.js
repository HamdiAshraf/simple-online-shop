


exports.getAddProduct=async(req,res,next)=>{
    res.render('add-product',{
        validationErrors:req.flash('validationErrors'),
        isUser:true,
        isAdmin:true
    })
}