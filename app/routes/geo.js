module.exports = (app) => {
    const geo = require('../controllers/geo.js');

    // Retrieve path for a specific bus in defined interval
    app.get('/polyline', geo.polyline);
}