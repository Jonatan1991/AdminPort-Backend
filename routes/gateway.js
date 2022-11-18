const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');

const router = Router();
const { getGateways, createGateway, updateGateway, deleteGateway } = require('../controllers/Gateway');


router.get('/', getGateways);

router.post('/',
[
    //middlewares to validate
    check('name', 'Gateway is required').not().isEmpty(),
    check('ip', 'Ip is required').not().isEmpty(),
    check('ip', 'Ip is wrong').isIP(),
    check('masterDevice', 'Device is required').not().isEmpty(),
    check('masterDevice', 'Device ID is bad').isMongoId(),
    validateField,
], 
createGateway);

router.put('/:id',
[
    //middlewares to validate
    check('name', 'Gateway is required').not().isEmpty(),
    check('ip', 'Ip is required').not().isEmpty(),
    check('ip', 'Ip is wrong').isIP(),
    check('masterDevice', 'Device is required').not().isEmpty(),
    check('masterDevice', 'Device ID is bad').isMongoId(),
    check('state', 'State is required').not().isEmpty(),
    validateField,
],  updateGateway);

router.delete('/:id', deleteGateway);

module.exports = router;