const { Router } = require('express');

const router = Router();
const { getDevices, createDevices } = require('../controllers/masterDevice');



router.get('/', getDevices);

router.post('/', createDevices);


module.exports = router;