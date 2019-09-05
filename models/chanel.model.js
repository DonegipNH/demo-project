var mongoose = require('mongoose');

var chanelSchema = new mongoose.Schema({
    value: String,
    time: Date
});

var chanel = mongoose.model('chanel', chanelSchema, 'temperature');

module.exports = chanel;