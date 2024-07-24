const Menu = require('../models/Menu');
const User = require('../models/User');


// Create Menu
exports.createMenu = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (user.menu) {
            return res.status(400).send({ message: 'User already has a menu' });
        }
        const menu = new Menu(req.body);
        await menu.save();
        user.menu = menu._id;
        await user.save();

        res.status(201).send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get All Menus
exports.getAllMenus = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const menus = await Menu.find();
        res.status(200).send(menus);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.user.menu);
        if (!menu) {
            return res.status(404).send({ message: 'Menu not found' });
        }

        // Ensure the menu belongs to the authenticated user
        if (!req.user || !req.user.menu.equals(menu._id)) {
            return res.status(403).send({ message: 'Forbidden' });
        }

        res.status(200).send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
exports.getMenuID = async (req, res) => {
    try {
        const id= req.params.resto;
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).send({ message: 'Menu not found' });
        }

        res.status(200).send(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
// Update Menu
exports.updateMenu = async (req, res) => {
    // Check for validation errors

    try {
        const menu = await Menu.findById(req.user.menu);
        if (!menu) {
            return res.status(404).send({ message: 'Menu not found' });
        }

        // Ensure the menu belongs to the authenticated user
        if (!req.user || !req.user.menu.equals(menu._id)) {
            return res.status(403).send({ message: 'Forbidden' });
        }

        // Update the menu
        Object.assign(menu, req.body);
        await menu.save();

        res.status(200).send(menu);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Bad Request', error });
    }
};

// Delete Menu
exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).send({ message: 'Menu not found' });
        }

        // Ensure the menu belongs to the authenticated user
        if (!req.user || !req.user.menu.equals(menu._id)) {
            return res.status(403).send({ message: 'Forbidden' });
        }

        // Delete the menu
        await menu.remove();

        // Remove menu ID from user
        req.user.menu = null;
        await req.user.save();

        res.status(200).send({ message: 'Menu deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
