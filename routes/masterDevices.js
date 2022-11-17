const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const router = Router();
const { getDevices, createDevices, updateDevice, deleteDevice } = require('../controllers/masterDevice');



router.get('/', getDevices);

router.post('/',
[
    //middlewares to validate
    check('device', 'Device is required').not().isEmpty(),
    validateField,
], 
createDevices);

router.put('/:id',
[
    //middlewares to validate
    check('device', 'Device is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    validateField,
],  updateDevice);

router.delete('/:id', deleteDevice);

module.exports = router;