const Client = require('../models/client');
const Product = require('../models/product');
const Purchase = require('../models/purchase');
const randomNumber = require('../helpers/randomNumber');
const ctrl = {}

ctrl.getClients = async (req, res) => {
    await Client.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else if (data.length > 0) {
            res.render('clients', { data });
        } else {
            const information = { "message": "Aún no hay clientes registrados :(", "route": "/clients/add", "messagebutton": "Registrar cliente" }
            res.render('information', { information });
        }
    })
}
ctrl.getFormClients = async (req, res) => {
    res.render('client-register')
}
ctrl.addClient = async (req, res) => {
    let datos = req.body;
    let code;
    let validation;
    do {
        code = randomNumber();
        validation = await Client.find({ "code": code })

    } while (validation.length > 0)
    datos["code"] = code;
    const newClient = new Client(datos);
    await newClient.save((err) => {
        if (err) {
            res.send(err)
        } else {
            const information = { "message": "El cliente ha sido registrado correctamente :)", "route": "/clients", "messagebutton": "Volver a la lista de clientes" }
            res.render('information', { information });
        }
    });
}

ctrl.getPurchasesMonth = async (req, res) => {
    const clientcode = req.params.id;
    const month = (req.body.month) - 1;

    await Purchase.find({ clientcode, "date": { "$gte": new Date(2019, month, 1), "$lt": new Date(2019, month, 31) } }, async (err, data) => {
        if (err) {
            res.send(err);
        } else if (data.length > 0) {
            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            let product = {};
            for (let index = 0; index < data.length; index++) {
                product = await Product.findOne({ code: data[index].productcode });
                data[index].productname = product.description
            }
            res.render('purchases-month', { data, mes: meses[month] })
        } else {
            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            const information= {"message": `El cliente no ha realizado ninguna compra en ${meses[month]}`,"route":`/clients`,"messagebutton":"Volver a la lista de clientes"}
            res.render('information',{information});
        }
    })
}

ctrl.addPurchase = async (req, res) => {
    const productcode = req.body.productcode;
    const quantity = req.body.quantity;
    const clientcode=req.params.id;
    await Client.findOne({code:clientcode}, async (err,data) =>{
        if(err) {
            res.send(err)
        }else if(data){
            Product.findOne({ "code": productcode}, async (err,product) =>{
                if(product){
                    const newStock = product.stock - quantity
                    if(newStock>=0){
                        product.stock = newStock;
                        await product.save();
                        await new Purchase({clientcode,productcode}).save();
                        const information= {"message": "Compra registrada correctamente.","route":`/clients/${clientcode}/purchase`,"messagebutton":"Realizar otra compra"}
                        res.render('information',{information});
                    }else{
                        const information= {"message": "Stock insuficiente.","route":`clients/${clientcode}/purchase`,"messagebutton":"Realizar otra compra"}
                        res.render('information',{information});
                    }
                }
            })            
        }else{
            const information= {"message": "El código de cliente especificado no existe :(","route":`/clients`,"messagebutton":"Volver a la lista de clientes"}
            res.render('information',{information});
        }
    })
}

ctrl.getFormPurchase = async (req, res) => {
    await Product.find({}, (err,products) => {
        if(err){
            res.send(err)
        }else if(products){
            res.render('purchase-form', {products})
        }else{
            const information = { "message": "Aún no existen productos registrados.", "route": `/products/add`, "messagebutton": "Registrar producto" }
            res.render('information', {information});
        }
    })
    
}

module.exports = ctrl;