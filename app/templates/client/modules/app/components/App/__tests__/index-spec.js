import React from 'react'
import { shallow } from 'enzyme'

import App from '../index'

describe('App', () => {
  test('renders a welcome message', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('h2').text()).toEqual('Welcome!')
  })
})
