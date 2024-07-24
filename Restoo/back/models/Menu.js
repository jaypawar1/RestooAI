const mongoose = require('mongoose');


const menuItemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String },
    logo: { type: String }, 
    description: { type: String },
    Price: { type: String }
});

const categorySchema = new mongoose.Schema({
    name: { type: String },
    item: [menuItemSchema] 
});

const serviceSchema = new mongoose.Schema({
    name: { type: String }
});


const menuSchema = new mongoose.Schema({
    RestorentName: { type: String },
    logo: { type:String,  }, // Replace with Buffer if you store binary data
    services: [serviceSchema], // Embed Service schema
    category: [categorySchema], // Embed Category schema
    map: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    insta: { type: String }
});

// Create a Model from the Schema
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
