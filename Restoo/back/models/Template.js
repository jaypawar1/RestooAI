const mongoose = require('mongoose');

const Template = new mongoose.Schema({
  id: { type: String, required: true , unique: true},
  user:{type:mongoose.Schema.Types.ObjectId , ref:"User", required:true},
  name: { type: String, required: true },
});

module.exports = mongoose.model('Template', Template);
