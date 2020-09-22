import React from 'react'
import { shallow } from 'enzyme'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DisplayTable from "../DisplayTable/displayTable";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {Search} from "./Search";

const setup = () => {
    const component = shallow(<Search />)
    const instance = component.instance()
    return { component, instance }
}

describe('HomePage', () => {
    it('should render correctly', () => {
        const { component } = setup()
        expect(component).toEqual(expect.anything())
    })

    it('should render Child component correctly', () => {
        const { component } = setup()
        expect(component.find(Autocomplete)).toHaveLength(2)
        expect(component.find(TextField)).toHaveLength(2)
        expect(component.find(Button)).toHaveLength(5)
        expect(component.find(DisplayTable)).toHaveLength(0)
        expect(component.find(SwapHorizIcon)).toHaveLength(1)
        expect(component.find(MuiPickersUtilsProvider)).toHaveLength(1)
        expect(component.find(KeyboardDatePicker)).toHaveLength(2)
    })

    it('should render DisplayTable component correctly', () => {
        const { component } = setup()
        component.setState({tableData: [{directions: "Fly from BOM to DEL"}]})
        expect(component.find(Autocomplete)).toHaveLength(2)
        expect(component.find(TextField)).toHaveLength(2)
        expect(component.find(Button)).toHaveLength(5)
        expect(component.find(DisplayTable)).toHaveLength(1)
        expect(component.find(SwapHorizIcon)).toHaveLength(1)
        expect(component.find(MuiPickersUtilsProvider)).toHaveLength(1)
        expect(component.find(KeyboardDatePicker)).toHaveLength(2)
    })

    it('should work onClick of Button correctly', () => {
        const { component, instance } = setup()
        const button =component.find('[data-id="searchButton"]')
        button.simulate('click')
        expect(instance.state.totalAdult).toEqual(2)
    })

    it('should work onChange of KeyboardDatePicker correctly', () => {
        const { component, instance } = setup()
        const keyboardPicker =component.find('[data-id="departureDate"]')
        keyboardPicker.simulate('change','2025-12-12')
        expect(instance.state.departureDate).toEqual('2025-12-12')
    })

})