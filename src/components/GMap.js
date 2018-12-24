import React, { Component } from 'react'

export default class GMap extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
    this.initMap()
  }

  componentDidUpdate (prevProps, prevState) {
    this.initMap()
  }

  initMap() {
    const { google } = this.props;

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      zoom: 4,
      center: {lat: 41.85, lng: -97.65}
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var { markers} = this.props

    markers.forEach(markerPoint => {
      let locationObj = markerPoint.geometry.location
      let { lat, lng } = locationObj
      var marker = new google.maps.Marker({
        position: {lat, lng},
        map: map
      })

      marker.addListener('click', function () {
        infowindow.open(map, marker)
      })

      var contentString = `<div><h5>${markerPoint.name}</h5></div>`

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      })
    });

    directionsDisplay.setMap(map);
    this.calcRoute(directionsService, directionsDisplay);
}


  calcRoute(directionsService, directionsDisplay) {
    var request = this.props.routePlan;
    directionsService.route(request, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    });
  }

  render () {
    return (
      <div className="col-sm-12">
      <div className="mapRef" id="map"></div>
      </div>
    )
  }
}
