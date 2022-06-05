import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


const containerStyle = {
  // position: 'relative',  
  width: '300px',
  height: '200px'
}

export class MapContainer extends Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {
      return (
        <Map google={this.props.google}
        containerStyle={containerStyle}
            onClick={this.onMapClicked}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
        </Map>
      )
    }
  }

export default GoogleApiWrapper({
   apiKey: ("AIzaSyBjOvIs8J5OiZrzsiOiN42Z3jKfZH1K71Q")
//    apiKey: ("430560948108-sjbt8qoepbh55hsltc39vt8rsls6as9j.apps.googleusercontent.com")
})(MapContainer)