const { Schema, model } = require('mongoose');

const GatewaySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ip: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    masterDevice: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'MasterDevice'
    }
    // ,
    // peripheralDevice: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'PeripheralDevice'
    // }
});

GatewaySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Gateway', GatewaySchema);