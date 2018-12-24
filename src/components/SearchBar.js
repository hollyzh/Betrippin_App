import React, { Component } from 'react'

import RoadTripAction from '../actions/RoadTripAction'

export default class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fieldCount: 0
    };
    this.pickType = this.pickType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch (e) {
    e.preventDefault()
    let { fieldCount } = this.state

    let { originInput, destinationInput, type } = this.refs
    let origin = originInput.value;
    let destination = destinationInput.value;
    let tripType = type.value;

    let waypoints = []
    let waypointQuery = ''
    for (let i = 0; i < fieldCount; i++) {
      if (!waypointQuery) {
        waypointQuery = '&waypoints='
      }
      let waypointLocation = eval(`this.refs.waypoint${i}.value`)
      let waypoint = {
        location: waypointLocation,
        stopover: true
      }
      waypoints.push(waypoint)
      if (i === fieldCount - 1) {
        waypointQuery += waypointLocation
      } else {
        waypointQuery += waypointLocation + '|'
      }
    }


    let query = `origin=${origin}&destination=${destination}${waypointQuery}`
    let routePlan = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }

    RoadTripAction.findRoute(routePlan)
    RoadTripAction.search(query, tripType)
  }

  addWaypointInput () {
    let { fieldCount } = this.state
    if (fieldCount < 8) {
      fieldCount++
      this.setState({fieldCount})
    }
  }

  removeWaypointInput () {
    let { fieldCount } = this.state
    if (fieldCount > 0) {
      fieldCount--
      this.setState({fieldCount})
    }
  }

  pickType (event) {
    let type = event.target.value
    this.setState({type})
  }

  render () {
    const { fieldCount } = this.state

    let waypointInputFields = []

    for (let i = 0; i < fieldCount; i++) {
      let newField = <input className="searchBar" key={i} ref={`waypoint${i}`} placeholder="enter waypoint" type="text" />
      waypointInputFields = [...waypointInputFields, newField]
    }

    return (
      <div className="searchBlock col-sm-12">
        <h3>Choose your trip type:</h3>
        <select className="btn searchBtn dropdown-toggle" ref="type" defaultValue="park">
          <option value="park">National Park Experience</option>
          <option value="restaurant">Culinary Adventure</option>
          <option value="amusement_park">Amusement Park Spree</option>
        </select>
        <form onSubmit={(e) => this.handleSearch(e)}>
          <input type="text" className="searchBar" ref="originInput" placeholder="enter origin" required />
          {waypointInputFields.map(field => {
            return field
          })}
          <input type="text" className="searchBar" ref="destinationInput" placeholder="enter destination" required />
          <div>
            <button className="btn btn-primary searchBtn" onClick={() => this.addWaypointInput()} type="button"><i className="glyphicon glyphicon-plus iconStyle"></i></button>
            <button className="btn btn-primary searchBtn" onClick={() => this.removeWaypointInput()} type="button"><i className="glyphicon glyphicon-minus iconStyle" /></button>
            <button className="btn btn-primary searchBtn" type='submit'>Start Trippin!</button>
          </div>
        </form>
      </div>
    )
  }
}
