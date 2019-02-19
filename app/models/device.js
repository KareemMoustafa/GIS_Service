const mongoose = require('mongoose');

mongoose.set('debug', function(coll, method, query, doc) {
    console.log(
      '\n\n',
      ' => Query executed: ',
      '\query => ' + JSON.stringify(query));
  });
  
const DeviceSchema = mongoose.Schema({
    CreatedAt: Date,
    Type: String,
    location: { type: {type:String}, coordinates: [Number] },
    humidity: String,
    temprature: String
}, {strict: false});

module.exports = function (IMEI) {
    let collection = 'sn' + IMEI
    return mongoose.model('Device', DeviceSchema, collection);
}