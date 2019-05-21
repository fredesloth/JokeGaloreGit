const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const service = new Schema({
    name: String,
    address: String,
    secret: String
});

service.methods.toString = function() {
    return "Name: " + this.name + ", secret: " + this.secret;
};

module.exports = mongoose.model('Service', service);