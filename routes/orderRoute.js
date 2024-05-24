
const { Router } = require('express');


const { verifyOrder, submitAddress, orderAll, orderSuccess, cancelOrder, cancelAllOrders, placeOrder, allOrders } = require('../controllers/orderController');

const router = Router();




router.get('/order-success', orderSuccess);
router.post('/cancel-order', cancelOrder);

// Route to handle canceling all orders
router.post('/cancel-all-orders', cancelAllOrders);
router.post('/order-all', orderAll)

// Route to handle displaying all orders
router.get('/all-orders', allOrders);


router.get('/all-orders-cancelled', (req, res) => {
    // Render a page to indicate that all orders have been cancelled
    res.render('all-orders-cancelled', { isUser: true });
});


router.post('/submit-address', submitAddress);






// Route to handle verifying the order
router.post('/verify-order', verifyOrder);


// Route to handle placing the order
router.post('/place-order', placeOrder);


module.exports = router;
