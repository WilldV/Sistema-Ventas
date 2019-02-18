const app = require('./config');

app.listen(app.get('port'), () =>{
    console.log('Servidor iniciado en el puerto: ' + app.get('port'));
});