const router = require('express').Router();
const ctrl = require('../controllers/product');


router.get('/',ctrl.getProducts);

router.get('/add', ctrl.formProduct);

router.post('/add',ctrl.addProduct);

router.get('/edit/:id',ctrl.formEditProduct);

router.post('/edit/:id',ctrl.editProduct);

router.get('/:id',ctrl.getPurchasesNumber);

module.exports = router;