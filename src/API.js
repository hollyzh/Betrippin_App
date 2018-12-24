import axios from 'axios'
import ServerAction from './actions/ServerAction'

let tempArr = []
let searchCounter = 0
let counter = 0

const API = {
  search (query, tripType) {
    //query: origin=Las Vegas&destination=Dallas&waypoints=Mesa
    axios.get(`/api/googleApi/directions?${query}`)
      .then(response => {
        let data = response.data
        console.log('data:', data)
        ServerAction.receiveSearchResults(data)
        let latLon = []
        data.routes[0].legs.forEach(leg => {
          leg.steps.forEach(step => {
            latLon.push(step)
          })
        })

        let passPackage = {
          latLon,
          tripType
        }
        return passPackage
      })
      .then(passPackage => {
        let {latLon, tripType} = passPackage
        latLon.map(pinPoint => {
          if (pinPoint.distance.value > 50000) {
            counter++
          }
          if (pinPoint.distance.value > 50000) {
            let { lat, lng } = pinPoint.end_location
            let queryFromLatLon = `location=${lat},${lng}`
            let query = ''
            switch (tripType) {
              case 'park':
                query = `${queryFromLatLon}&type=park&keyword=national+park`
                break
              case 'restaurant':
                query = `${queryFromLatLon}&type=restaurant&keyword=restaurant`
                break
              default:
                query = `${queryFromLatLon}&type=amusement_park&keyword=amusement+park`
                break
            }
            API.getPlaces(query)
          }
        })
      })
      .catch(console.error)
  },
  getPlaces (query) {
    axios.get(`/api/googleApi/places?${query}`)
      .then(res => {
        res.data.results.forEach(result => tempArr.push(result))
        ++searchCounter
        if (searchCounter === counter) {
          ServerAction.receivePlaceResults(tempArr)
          tempArr = []
          searchCounter = 0
          counter = 0
        }
      })
      .catch(console.error)
  }
}

export default API
