const { response } = require('express');
const MasterDevice = require('../models/masterDevice');


const getDevices = async (req, res) => {
    const masterDevices = await MasterDevice.find({});
    res.json({
        ok: true,
        masterDevices
    });
};

const createDevices = async (req, res = response) => {
    const { device, description } = req.body;
    try {
        const repeatDevice = await MasterDevice.findOne({ device });
        if (repeatDevice) {
            return res.status(400).json({
                ok: false,
                msg: 'The Device exist'
            });
        }

        const masterDevice = new MasterDevice(req.body);

        await masterDevice.save();
        // console.log( req.body );

        res.json({
            ok: true,
            masterDevice
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Inesperate Error...'
        })
    }
};

const updateDevice = async (req, res = response) => {

    const id = req.params.id;
    try {
        const deviceDB = await MasterDevice.findById(id);

        if (!deviceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Not exist a Device by this id',
            });
        }

        const fields = req.body;

        if (deviceDB.device === req.body.device) {
            delete fields.device;
        } else {
            const existDevice = await MasterDevice.findOne({ device: req.body.device });
            if (existDevice) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Exist a Device by same name',
                })
            }
        }

        const deviceUpdated = await MasterDevice.findByIdAndUpdate(id, fields, { new: true });

        res.json({
            ok: true,
            deviceUpdated: 'Device update correctly'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Inesperate Error...'
        })
    }
}

const deleteDevice = async (req, res = response) => {

    const id = req.params.id;
    try {
        const deviceDB = await MasterDevice.findById(id);

        if (!deviceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Not exist a Device by this id',
            });
        }

     await MasterDevice.findByIdAndDelete(id);

        res.json({
            ok: true,
            deviceUpdated: 'Device deleted correctly'
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
    getDevices,
    createDevices,
    updateDevice,
    deleteDevice
}