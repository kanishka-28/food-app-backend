import React from 'react';
import GoogleMapReact from 'google-map-react';
import { MdLocationOn } from 'react-icons/md';

const AnyReactComponent = ({ text }) => <MdLocationOn className="text-megenta-400 text-2xl"/>;

const SimpleMap = ({location})=>{
  const defaultProps = {
    center: {
      lat: location.latitude,
      lng: location.longitude
    },
    zoom: 11
  };

  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBjOvIs8J5OiZrzsiOiN42Z3jKfZH1K71Q" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
 
}

export default SimpleMap;