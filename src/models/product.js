const mongoose = require('mongoose');
const {Schema} = mongoose;
const model = mongoose.model;

const ProductSchema = new Schema({
    code: Number,
    description: String,
    price: Number,
    stock: Number
})

module.exports = model('Product',ProductSchema);