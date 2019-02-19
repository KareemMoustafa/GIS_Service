const OSRM = require('osrm.js')

// Find a path for a specific bus in defined interval
exports.polyline = (req, res) => {
    const Device = require('../models/device.js')(req.query.IMEI)
    let filter = {CreatedAt: {$gte: new Date(req.query.Start), $lt: new Date(req.query.End)}}
    Device.find(filter, {'_id': 0, 'location.coordinates': 1}).sort({CreatedAt: -1})
    .then(doc => {
        if(!doc) {
            return res.status(404).send({
                message: 'Device not found with id '
            });            
        }
        let points = []
        for (key in doc) {
            let lat = doc[key].location.coordinates[1]
            let lng = doc[key].location.coordinates[0]
            if (lat > 0 && lng > 0) points.push([doc[key].location.coordinates[1], doc[key].location.coordinates[0]])
        }
        osrm_route(points).then(result => {
            if (result.routes) res.send(JSON.stringify(result.routes[0].geometry));
            return res.status(404).send({
                message: result.code
            });  

        })
    }).catch(err => {
            return res.status(404).send({
                message: err
            });  
    });
};

function osrm_route(points) {
    return new Promise ((resolve, reject) => {
        let osrm = new OSRM('http://13.233.254.46:5000');
        osrm.route({
            coordinates: points,
            steps: true,
            alternatives: true,
            overview: 'full',
            geometries: 'polyline'
    
        }, function(err, result) {
            console.log(result)
            if(err) reject(err);
            resolve(result)
        });
    })
}
