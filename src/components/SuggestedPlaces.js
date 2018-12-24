import React, { Component } from 'react'
import uuid from 'uuid'
import RoadTripAction from '../actions/RoadTripAction'

export default class SuggestedPlaces extends Component {
  constructor () {
    super()

    this.addMarker = this.addMarker.bind(this)
  }

  addMarker (place) {
    RoadTripAction.addMarker(place)
  }

  addWaypoint (place) {
    RoadTripAction.addWaypoint(place)
  }

  render () {
    const { places } = this.props
    let ratingSize
    return (
      <div className="allPlaces row">
          {places.map(place => {
            let { name, rating, photos, vicinity } = place
            ratingSize = {maxWidth: `${150 * (parseFloat(rating) / 5)}px`}
            return (
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3" key={uuid()}>
                <div className="placeCard">
                {photos ? <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`} /> : <img src="../images/placeholder.png" />}
                <div className="cardDetails">
                  <buttton className="btn cardBtn col-xs-12" onClick={() => this.addMarker(place)}>Mark Map</buttton>
                  {/* <buttton className="btn cardBtn col-xs-6" onClick={() => this.addWaypoint(place)}>Add Waypoint</buttton> */}
                  <div className="info col-xs-12">
                    <h4>{name}</h4>
                    <p>{vicinity}</p>
                    {rating ? <span className="ratingStars" style={ratingSize}><img src="../images/stars.png" /></span> : null}
                  </div>
                </div>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}
