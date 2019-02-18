const mongoose = require('mongoose');
const {Schema} = mongoose;
const model = mongoose.model;

const ProvitionSchema = new Schema({
    providercode: Number,
    productcode: Number
})

module.exports = model('Provition',ProvitionSchema);