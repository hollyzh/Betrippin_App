const mongoose = require('mongoose');

const betrippinSchema = new mongoose.Schema({
  orignName: {type: String, required: true},
  destinationName: {type: String, required: true},
  wayPoint: {type: Array},
  tripName: {type: String},
  tripType: {type: String}
});

const Betrippin = mongoose.model('Betrippin', betrippinSchema);

module.exports = Betrippin;
