const Product = require('../models/product');
const Purchase = require('../models/purchase');
const randomNumber = require('../helpers/randomNumber');
const ctrl = {}

ctrl.getProducts = async (req,res) =>{
    await Product.find({}, (err,data) =>{
        if(err){
            res.send(err)
        }else if(data.length>0){
            res.render('products',{data})
        }else{
            res.send('Aún no hay productos registrados :(');
        }
    })
}

ctrl.formProduct = (req,res) =>{
    res.render('product-register',{"edit":false})
}

ctrl.addProduct = async (req,res) =>{
    let datos = req.body;
    let code;
    let validation;
    do {
        code = randomNumber();
        validation = await Product.find({ "code": code })
    } while (validation.length > 0)
    datos["code"] = code;
    const newProduct = new Product(datos);
    await newProduct.save(err => {
        if(err){
            res.send(err)
        }else{
            res.send('Producto agregado :)')
        }
    })
}

ctrl.formEditProduct = async (req,res) =>{
    await Product.findOne({code: req.params.id}, (err,data) => {
        if(err){
            res.send(err);
        }else if(data){
            res.render('product-register',{"edit":true,data})
        }else{
            const information = { "message":"No existe producto con el ID especificado.", "route": "/products", "messagebutton": "Volver a la lista de productos" }
            res.render('information', { information });
        }
    });
}

ctrl.editProduct = async (req,res) =>{
    const datos = req.body;
    const code = req.params.id;
    await Product.findOneAndUpdate({"code":code}, datos, (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send('Producto actualizado.');
        }
    });
}

ctrl.getPurchasesNumber = async (req,res) =>{
    const productcode = req.params.id;
    
    await Purchase.find({productcode}, (err,data) =>{
        if(err){
            res.send(err);
        }else if(data.length==1){
            const information = { "message": `El producto había sido comprado 1 vez.`, "route": "/products", "messagebutton": "Volver a la lista de productos" }
            res.render('information', { information });
        }else if(data.length>1){
            const information = { "message":`El producto había sido comprado ${data.length} veces.`, "route": "/products", "messagebutton": "Volver a la lista de productos" }
            res.render('information', { information });
        }else{
            const information = { "message":'Todavía no se ha comprado ni una unidad del producto.', "route": "/products", "messagebutton": "Volver a la lista de productos" }
            res.render('information', { information });
        }
    })
}

module.exports = ctrl;