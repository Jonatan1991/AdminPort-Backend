const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const router = Router();
const { getPeripheralDevices, createPeripheralDevice, updateDevice, deleteDevice } = require('../controllers/peripheralDevice');



router.get('/', getPeripheralDevices);

router.post('/',
[
    //middlewares to validate
    check('name', 'Device is required').not().isEmpty(),
    check('vendor', 'vendor is required').not().isEmpty(),
    check('date', 'date is required').not().isEmpty(),
    check('gateway', 'gateway is required').not().isEmpty(),
    // check('date', 'date is required').isDate(),
    validateField,
], 
createPeripheralDevice);

router.put('/:id',
[
    //middlewares to validate
    check('name', 'Device is required').not().isEmpty(),
    check('vendor', 'Vendor is required').not().isEmpty(),
    check('gateway', 'Gateway is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    validateField,
],  updateDevice);

router.delete('/:id', deleteDevice);

module.exports = router;