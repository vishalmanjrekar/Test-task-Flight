import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

// TODO: it's an example of reusable setup which we can resuse in whole page & we can passs props as parameter & use via ...props
const setup = () => {
  const component = shallow(<App />)
  const instance = component.instance()
  return { component, instance }
}

describe('App', () => {
  it('should render correctly', () => {
    const { component } = setup()
    expect(component).toEqual(expect.anything())
  })
})
