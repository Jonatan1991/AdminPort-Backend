const { response } = require('express');
const Gateway = require('../models/gateway');
// const MasterDevice = require('../models/masterDevice');


const getGateways = async (req, res) => {
    const gateway = await Gateway.find()
    .populate('masterDevice', 'device')
    // .populate('peripheralDevice', 'name')
    ;
    res.json({
        ok: true,
        gateway
    });
};

const createGateway = async (req, res = response) => {
    const { name, ip, masterDevice } = req.body;
    const gateway = new Gateway(req.body);
    try {
        const repeatGateway = await Gateway.findOne({ name });
        const repeatIp = await Gateway.findOne({ ip });
        // const masterDevice = await MasterDevice.findOne({ device_id });

        if (repeatGateway) {
            return res.status(400).json({
                ok: false,
                msg: 'The Gateway exist'
            });
        }

        if (repeatIp) {
            return res.status(400).json({
                ok: false,
                msg: 'The Ip exist'
            });
        }


       const gatewayDB = await gateway.save();
        // console.log( req.body );

        res.json({
            ok: true,
            gateway: gatewayDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Inesperate Error...'
        })
    }
};

const updateGateway = async (req, res = response) => {

    const id = req.params.id;
    try {
        const gatewayDB = await Gateway.findById(id);

        if (!gatewayDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Not exist a Gateway by this id',
            });
        }

        const fields = req.body;

        // if (gatewayDB.name === req.body.name) {
        //     delete fields.name;
        // } else {
        //     const existGateway = await Gateway.findOne({ gateway: req.body.name });
        //     if (existGateway) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Exist a Gateway by same name',
        //         })
        //     }
        // }

        const gatewayUpdated = await Gateway.findByIdAndUpdate(id, fields, { new: true });

        res.json({
            ok: true,
            gatewayUpdated: 'Gateway update correctly'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Inesperate Error...'
        })
    }
}

const deleteGateway = async (req, res = response) => {

    const id = req.params.id;
    try {
        const gatewayDB = await Gateway.findById(id);

        if (!gatewayDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Not exist a Gateway by this id',
            });
        }

     await Gateway.findByIdAndDelete(id);

        res.json({
            ok: true,
            gatewayUpdated: 'Gateway deleted correctly'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Inesperate Error...'
        })
    }

}

module.exports = {
    getGateways,
    createGateway,
    updateGateway,
    deleteGateway
}