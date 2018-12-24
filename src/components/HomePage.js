import React, { Component } from 'react'
import SearchBar from './SearchBar'
import GMap from './GMap'
import RoadTripStore from '../stores/RoadTripStore'
import SuggestedPlaces from './SuggestedPlaces'

export default class HomePage extends Component {
  constructor () {
    super()

    this.state = {
      routePlan: RoadTripStore.getRoutePlan(),
      searchResult: RoadTripStore.getSearchResult(),
      places: RoadTripStore.getPlaces(),
      markers: RoadTripStore.getMarkers()
    }
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount () {
    RoadTripStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    RoadTripStore.stopListening(this._onChange)
  }

  _onChange () {
    this.setState({
      routePlan: RoadTripStore.getRoutePlan(),
      searchResult: RoadTripStore.getSearchResult(),
      places: RoadTripStore.getPlaces(),
      markers: RoadTripStore.getMarkers()
    })
  }

  render () {
    const { places } = this.state
    return (
      <div className="container">
        <div className="row">
          <GMap google={window.google} {...this.state} />
        </div>
        <div className="row">
          <SearchBar />
        </div>
        <div className>
          <SuggestedPlaces {...this.state} />
        </div>
      </div>
    )
  }
}
