import React from 'react'
import TestRenderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import PlacesList from './PlacesList'
import List from './List'

it(`Renders initial list with sugessted locations`, () => {
  const locations = [
    {id: 1, name: 'Someplace', location: {distance: 100, address: 'Some address', lat: 70.21, lng: 29.01}}
  ]
  const props = {
    searchQuery: '',
  }
  const component = TestRenderer.create(
    <MockedProvider>
      <PlacesList foundLocations={locations} {...props} />
    </MockedProvider>
  )  
  expect(component.root.findByType(List)).toBeDefined()  
})