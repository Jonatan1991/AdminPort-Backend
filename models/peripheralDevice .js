const { Schema, model } = require('mongoose');

const PeripheralDeviceSchema  = Schema({

    name: {
        type: String,
        required: true
    },
    vendor : {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    gateway: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Gateway'
    }

});

PeripheralDeviceSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('PeripheralDevice', PeripheralDeviceSchema );