const mongoose = require('mongoose');
const {Schema} = mongoose;
const model = mongoose.model;

const ClienteSchema = new Schema({
    code: Number,
    name: String,
    surname: String,
    adress: String,
    phone: String
})

module.exports = model('Client',ClienteSchema);