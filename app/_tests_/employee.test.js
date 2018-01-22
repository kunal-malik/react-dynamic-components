import React from 'react';
import ReactDOM from 'react-dom';
import Employee from '../components/employee'
import { shallow, mount } from 'enzyme';
import stub from '../stub.json'

describe('Employee component ', () => {
    const handleChange = jest.fn()
    const removeEmployee = jest.fn()
    const handleEmployeeChanges = jest.fn()

    it('Employee renders without crashing', () => {
     shallow(<Employee employeeIndex={0} employee={stub.employees} length={1}  removeEmployee={removeEmployee} handleEmployeeChanges={handleEmployeeChanges}/>);
    });

    it('Branch should add an employee while initializing', () => {
        const wrapper =  mount(<Employee employeeIndex={0} employee={stub.employees} length={1}  removeEmployee={removeEmployee} handleEmployeeChanges={handleEmployeeChanges}/>);
        expect(wrapper.state().employee.length).toBe(1);
    })

    it('Employee handleChange function is called whenever there is any change in employee details', () => {
        spyOn(Employee.prototype,'handleChange').and.callThrough()
        const wrapper =  mount(<Employee employeeIndex={0} employee={stub.employees} length={1}  removeEmployee={removeEmployee} handleEmployeeChanges={handleEmployeeChanges}/>);
        const designation = wrapper.find('[id="employee-designation-0"]')
        designation.simulate('change',{
            target: {
                value: 'consultant'
            }
        })
        expect(Employee.prototype.handleChange).toHaveBeenCalled()
        const gender = wrapper.find('[id="employee-gender-0"]')
        gender.simulate('change',{
            target: {
                value: 'female'
            }
        })
        expect(Employee.prototype.handleChange).toHaveBeenCalled()
    })
})