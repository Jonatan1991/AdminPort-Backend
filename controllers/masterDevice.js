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


module.exports = {
    getDevices,
    createDevices,
}