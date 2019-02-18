const mongoose = require('mongoose');
const {Schema} = mongoose;
const model = mongoose.model;
const actual = new Date();

const PurchaseSchema = new Schema({
    clientcode: Number,
    productcode: Number,
    date: {type: Date, default: new Date(actual.getFullYear(), actual.getMonth(),actual.getDate())}
})

module.exports = model('Purchase',PurchaseSchema);