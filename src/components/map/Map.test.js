import React from 'react'
import TestRenderer from 'react-test-renderer'
import Map from './Map'

it(`Matches the snapshot`, () => {  
  const mapURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAu9vUpekI9On31tWifZmnnHDTCTbyxHsA&v=3.exp&libraries=places`
  const props = {
    isMarkerShown: true,
    lat: 10.23,
    lng: 12.34,
    disableDefaultUI: true,
    googleMapURL: mapURL,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div />,
    loadingElement: <div>...Loading</div>
  }
  const component = TestRenderer.create(<Map {...props} />)
  expect(component.toJSON()).toMatchSnapshot()
})