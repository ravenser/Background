const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    _id: {type: ObjectId},
    name: {type: String},
});

const Region = module.exports = mongoose.model('Region', RegionSchema);