const Client = require('../models/Client'); // Adjust the path as necessary

// Create a new client
const createClient = async (req, res) => {
    try {
        const { name, phone } = req.body;

        const newClient = new Client({
            name,
            phone
        });

        await newClient.save();
        res.status(201).json({
            success: true,
            data: newClient
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get all clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().populate('orders');
        res.status(200).json({
            success: true,
            data: clients
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get a single client by ID
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate('orders');

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.status(200).json({
            success: true,
            data: client
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update a client by ID
const updateClient = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            { name, phone },
            { new: true, runValidators: true }
        );

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.status(200).json({
            success: true,
            data: client
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);

        if (!client) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Client deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};
