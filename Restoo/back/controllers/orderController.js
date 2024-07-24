const Order = require('../models/Order'); // Adjust the path as necessary
const Client = require('../models/Client')

const createOrder = async (req, res) => {
    try {
        const { product, price, status, orderDate, clientId } = req.body;
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        const newOrder = new Order({
            product,
            price,
            status,
            orderDate
        });

        await newOrder.save();
        client.orders.push(newOrder._id);
        await client.save();

        res.status(201).json({
            success: true,
            data: newOrder
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
        const { product, price, status, orderDate } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { product, price, status, orderDate },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
