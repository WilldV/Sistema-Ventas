const mongoose = require('mongoose');
const {Schema} = mongoose;
const model = mongoose.model;

const ProviderSchema = new Schema({
    code: Number,
    name: String,
    surname: String,
    adress: String,
    province: String,
    phone: String
})

module.exports = model('Provider',ProviderSchema);