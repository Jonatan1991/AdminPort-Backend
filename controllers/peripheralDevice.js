const { response } = require('express');
const PeripheralDevice = require('../models/peripheralDevice ');


const getPeripheralDevices = async (req, res) => {
    const peripheralDevice = await PeripheralDevice.find().populate('gateway', 'name ip');
    res.json({
        ok: true,
        peripheralDevice
    });
};

const createPeripheralDevice = async (req, res = response) => {
    const { name, vendor, date, gateway } = req.body;
    const device = new PeripheralDevice(req.body);
    try {
        const repeatDevice = await PeripheralDevice.findOne({ name });

        if (repeatDevice) {
            return res.status(400).json({
                ok: false,
                msg: 'The Peripheral Device exist'
            });
        }


        const deviceDB = await device.save();
        // console.log( req.body );

        res.json({
            ok: true,
            deviceDB
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
        const deviceDB = await PeripheralDevice.findById(id);

        if (!deviceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Not exist a Device by this id',
            });
        }

        const fields = req.body;

        // if (deviceDB.name === req.body.name) {
        //     delete fields.name;
        // } else {
        //     const existDevice = await PeripheralDevice.findOne({ device: req.body.name });
        //     if (existDevice) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: 'Exist a Device by same name 1',
        //         })
        //     }
        // }

        const deviceUpdated = await PeripheralDevice.findByIdAndUpdate(id, fields, { new: true });

        res.json({
            ok: true,
            msg: 'Device update correctly',
            deviceUpdated
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
        const deviceDB = await PeripheralDevice.findById(id);

        if (!deviceDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Not exist a Device by this id',
            });
        }

        await PeripheralDevice.findByIdAndDelete(id);

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
    getPeripheralDevices,
    createPeripheralDevice,
    updateDevice,
    deleteDevice
}