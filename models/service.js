const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    _id: {type: ObjectId},
    name: {type: String},
    description: {type: String}
});

const Service = module.exports = mongoose.model('Service', ServiceSchema);