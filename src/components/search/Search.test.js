import React from 'react'
import TestRenderer from 'react-test-renderer'
import Search from './Search'

it(`Matches the snapshot`, () => {
  const props = {
    onChange: jest.fn()
  }
  const component = TestRenderer.create(<Search {...props} />)  
  expect(component.toJSON()).toMatchSnapshot()
})