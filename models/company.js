const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    _id: {type: ObjectId},
    name: {type: String},
    rating: {type: Number},
    image: {type:String},
    description: {type: String},
    factor: {
        city: {type: Number},
        region: {type: Number},
        country: {type: Number}
            },
    cities: [String],
    services: {type: Array, "default" : []}
});

const Company = module.exports = mongoose.model('Company', CompanySchema);
