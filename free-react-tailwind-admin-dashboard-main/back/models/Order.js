const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new mongoose.Schema({
    item:{type:String , require:true},
    price: { type: Number }, 
    quentity:{type:Number}
});

const orderSchema = new Schema({
  product:[Product],
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
