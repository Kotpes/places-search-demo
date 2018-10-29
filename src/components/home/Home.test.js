import React from 'react'
import TestRenderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import wait from 'waait'
import Home, {GET_SUGGESTED_PLACES} from './Home'
import Loading from '../shared/Loading'
import PlacesList from '../placesList/PlacesList'


const mocks = [
  {
    request: {
      query: GET_SUGGESTED_PLACES,
    },
    result: {
      data: {
        suggestedVenues: [
          {id: 1, name: 'Someplace', location: {distance: 100, address: 'Some address', lat: 70.21, lng: 29.01}}
        ]
      },
    },
  },
];

it(`Renders with loading state`, () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  )
  expect(component.root.findByType(Loading)).toBeDefined()  
})

it(`Renders with error state`, async() => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  )
  //Waiting for response
  await wait(0);
  const tree = component.toJSON()
  const expected = /Error/  
  expect(tree.children[2]).toEqual(expect.stringMatching(expected))
})

