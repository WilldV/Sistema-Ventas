const Provider = require('../models/provider');
const Provition = require('../models/provition');
const Product = require('../models/product');
const Client = require('../models/client');
const randomNumber = require('../helpers/randomNumber')
const ctrl = {}

ctrl.getProviders = async (req, res) => {
    await Provider.find({}, async (err, providers) => {
        if (err) {
            res.send(err)
        } else if (providers.length > 0) {
            await Product.find({}, (err, products) => {
                if(err){
                    res.send(err)
                }else{
                    res.render('providers', {providers,products})
                }
            })
        } else {
            const information = { "message": "Aún no se han registrado proveedores", "route": "/providers/add", "messagebutton": "Registrar proveedor" }
            res.render('information', { information });
        }
    })
}

ctrl.getProviderForm = (req, res) => {
    res.render('provider-register');
}

ctrl.addProvider = async (req, res) => {
    let datos = req.body;
    let code;
    let validation;
    do {
        code = randomNumber();
        validation = await Provider.find({ "code": code })
    } while (validation.length > 0)
    datos["code"] = code;
    const newProvider = new Provider(datos);
    await newProvider.save(err => {
        if (err) {
            res.send(err);
        } else {
            const information = { "message": "Proveedor registrado", "route": "/providers", "messagebutton": "Lista de proveedores" }
            res.render('information', { information });
        }
    })
}

ctrl.getProvition = async (req, res) => {
    const providercode = req.params.id;
    await Provition.find({ providercode }, async (err, data) => {
        if (err) {
            res.send(err);
        } else if (data.length > 0) {
            let product = {};
            for (let index = 0; index < data.length; index++) {
                product = await Product.findOne({code:data[index].productcode});
                data[index].description = product.description;
                data[index].price = product.price;
                data[index].stock = product.stock;
                data[index].code = product.code;
            }
            res.render('products', { data })
        } else {
            const information = { "message": "El proveedor no posee productos registrados", "route": `/providers`, "messagebutton": "Lista de proveedores" }
            res.render('information', { information });
        }
    })
}

ctrl.deleteProvider = async (req, res) => {
    const code = req.params.id;
    await Provider.findOneAndDelete({"code":code}, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const information = { "message": "Proveedor eliminado.", "route": `/providers`, "messagebutton": "Lista de proveedores" }
            res.render('information', { information });
        }
    })
}

ctrl.addProvition = async (req, res) => {
    const providercode = req.params.id
    console.log(providercode);
    const productcode = req.body.productcode;
    await Provider.findOne({ "code": providercode }, async (err, data) => {
        if (err) {
            res.send(err)
        } else if (data) {
            const newProvition = new Provition({ providercode, productcode })
            await newProvition.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    const information = { "message": "Provisión registrada.", "route": `/providers/${providercode}`, "messagebutton": "Provisiones del proveedor" }
                    res.render('information', { information });
                }
            })
        } else {
            const information = { "message": "No existe cliente con el ID especificado.", "route": `/providers`, "messagebutton": "Lista de proveedores" }
            res.render('information', { information });
        }
    })
}

module.exports = ctrl;