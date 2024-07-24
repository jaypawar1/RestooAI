const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Order = require("./orderModel"); // Import the Order model

const clientSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }], // Array of orders
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
