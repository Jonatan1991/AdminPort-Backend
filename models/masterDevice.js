const { Schema, model } = require('mongoose');

const MasterDeviceSchema = Schema({

    device: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },

});

MasterDeviceSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('MasterDevice', MasterDeviceSchema);