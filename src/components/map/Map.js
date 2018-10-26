import * as React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

const Map = (props) => {
  const {lat, lng} = props
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{lat, lng}}
    >
      {props.isMarkerShown && <Marker position={{lat, lng}} />}
    </GoogleMap>
  )
}
export default withScriptjs(withGoogleMap(Map))