const router = require('express').Router();
const ctrl = require('../controllers/provider');


router.get('/',ctrl.getProviders);

router.get('/add', ctrl.getProviderForm)

router.post('/add',ctrl.addProvider);

router.get('/:id',ctrl.getProvition);

router.get('/:id/delete',ctrl.deleteProvider);

router.post('/:id/add', ctrl.addProvition);

module.exports = router;