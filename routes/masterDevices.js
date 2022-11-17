const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const router = Router();
const { getDevices, createDevices } = require('../controllers/masterDevice');



router.get('/', getDevices);

router.post('/',
[
    //middlewares to validate
    check('device', 'Device is required').not().isEmpty(),
    validateField,
], 
createDevices);


module.exports = router;