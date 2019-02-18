const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {home,client,provider,product} = require('./routes');
const database = require('./database/connection');

const app = express();
//configuracion
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname+'/views')
app.set('view engine', 'pug');
//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//usamos nuestras rutas;
app.use('/',home);
app.use('/clients',client);
app.use('/providers',provider);
app.use('/products',product);
//conectamos a la base de datos;
database();

//exportamos nuestra app :3

module.exports = app;
