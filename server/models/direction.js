const axios = require('axios')
// require('dotenv').config()

exports.getInitialRoute = (query, cb) => {
  let {origin, destination, waypoints} = query

  axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${process.env.GOOGLE_API_KEY}`)
    .then(res => cb(null, res.data))
    .catch(console.error)
}

exports.getPlaces = (query, cb) => {
  let {location, type, keyword} = query
  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=8000&type=${type}&keyword=${keyword}&key=${process.env.GOOGLE_API_KEY}`)
    .then(res => cb(null, res.data))
    .catch(console.error)
}
