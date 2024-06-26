const Order = require('../models/Order')
const Cart = require('../models/Cart')


exports.orderSuccess = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Render the order success view and pass the orders data
        res.render('order-success', { orders, isUser: true,pageTitle:'Order-Success' });
    } catch (err) {
        next(err);

    }
}


exports.cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        // Find the order by its ID and delete it from the database
        await Order.findByIdAndDelete(orderId);

        // Redirect to a confirmation page or any other appropriate action
        res.redirect('/order/all-orders');
    } catch (err) {
        next(err);

    }
}


exports.cancelAllOrders = async (req, res) => {
    try {
        // Delete all orders from the database
        await Order.deleteMany({});

        // Redirect to a success page or any other appropriate action
        res.redirect('/order/all-orders');
    } catch (error) {
        next(error);

    }
}


exports.placeOrder = async (req, res) => {
    const { itemId, productName, amount, price, address } = req.body;

    try {
        // Your logic to create an order
        const newOrder = new Order({
            itemId,
            productName,
            amount,
            price,
            address,
            orderDate: new Date(),
        });
        await newOrder.save();

        // Set the order data in session
        req.session.order = newOrder;

        // Redirect to the order success route
        res.redirect('/order/order-success');

    } catch (err) {
        next(err);

    }
}


exports.submitAddress = async (req, res) => {
    const { orderId, address } = req.body;

    try {
        // Update the order in the database with the provided address
        await Order.findByIdAndUpdate(orderId, { address });

        // Redirect to the page that displays all orders
        res.redirect('/order/all-orders');
    } catch (error) {
        next(error);

    }
}


exports.verifyOrder = (req, res) => {
    const { itemId, productName, amount, price } = req.body;
    // Render a page to verify the order with an address input
    res.render('verify-order', { itemId, productName, amount, price, isUser: true, isAdmin: req.session.isAdmin,pageTitle:'verify-order' });
}


exports.allOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const orders = await Order.find();

        // Render the page that displays all orders
        res.render('all-orders', { orders, isUser: true, isAdmin: req.session.isAdmin,pageTitle:'All Orders' });
    } catch (error) {
        next(error);

    }
}



exports.orderAll = async (req, res) => {
    try {
        // Logic to handle ordering all items
        // For example, assuming you have a method to retrieve all items from the database
        const allItems = await Cart.find();

        // Process each item (example logic)
        allItems.forEach(async (item) => {
            // Your logic to create an order for each item
            const newOrder = new Order({
                itemId: item._id,
                productName: item.name,
                amount: item.amount,
                price: item.price,
                // Additional order details as needed
            });
            await newOrder.save();
        });

        // Redirect to a success page or any other appropriate action
        res.redirect('/order/all-orders');
    } catch (error) {
        next(error);

    }
};