const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    _id: {type: ObjectId},
    name: {type: String},
    regionID: {type: String}
});

const City = module.exports = mongoose.model('City', CitySchema);