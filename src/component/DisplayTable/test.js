import React from 'react'
import { shallow } from 'enzyme'
import {DisplayTable} from "./displayTable";

const setup = () => {
    const component = shallow(<DisplayTable />)
    const instance = component.instance()
    return { component, instance }
}

describe('Display Table', () => {
    it('should render correctly', () => {
        const { component } = setup()
        expect(component).toEqual(expect.anything())
    })
})