const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://admin:admin123@ds219181.mlab.com:19181/ventas', {
        useNewUrlParser: true
    }).then(db => console.log('Conectado a la BD'))
        .catch(error => console.log(error))
}