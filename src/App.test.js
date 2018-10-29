import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TestRenderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test(`Should match snapshot`, () => {
  const tree = TestRenderer.create(<App />)
  expect(tree.toJSON()).toMatchSnapshot()
})


