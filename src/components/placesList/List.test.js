import React from 'react'
import TestRenderer from 'react-test-renderer'
import {Link} from '@reach/router'
import List from './List'

it(`Matches the snapshot`, () => {
  const locations = [
    {id: 1, name: 'Someplace', location: {distance: 100, address: 'Some address', lat: 70.21, lng: 29.01}}
  ]
  const component = TestRenderer.create(<List locations={locations}/>)  
  expect(component.toJSON()).toMatchSnapshot()
})

it(`Contains link to the place`, () => {
  const locations = [
    {id: 1, name: 'Someplace', location: {distance: 100, address: 'Some address', lat: 70.21, lng: 29.01}}
  ]
  const component = TestRenderer.create(<List locations={locations}/>) 
  //Link is rendered 
  expect(component.root.findByType(Link)).toBeDefined()
  //Link has correct to prop value
  expect(component.root.findByType(Link).props.to).toBe('places/1') 
})