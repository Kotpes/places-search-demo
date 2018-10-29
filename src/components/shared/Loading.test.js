import React from 'react'
import TestRenderer from 'react-test-renderer'
import Loading from './Loading'

it(`Matches the snapshot`, () => {
  const component = TestRenderer.create(<Loading />)  
  expect(component.toJSON()).toMatchSnapshot()
})