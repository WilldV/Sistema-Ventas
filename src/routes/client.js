const router = require('express').Router();
const ctrlclient = require('../controllers/client');

router.get('/',ctrlclient.getClients);

router.get('/add',ctrlclient.getFormClients);

router.post('/add',ctrlclient.addClient);

router.post('/:id',ctrlclient.getPurchasesMonth);

router.get('/:id/purchase',ctrlclient.getFormPurchase);

router.post('/:id/purchase',ctrlclient.addPurchase);

module.exports = router;