import React from 'react';
import ReactDOM from 'react-dom';
import Branch from '../components/branch'
import { shallow, mount } from 'enzyme';
import stub from '../stub.json'

describe('Branch component ', () => {
    const handleBranchChanges = jest.fn()
    const removeBranch = jest.fn()
    const handleComponentChanges = jest.fn()
    const handleChange = jest.fn()
    const handleEmployeeChanges = jest.fn()
    it('Branch renders without crashing', () => {
     shallow(<Branch branchIndex={0} branch={stub} length={1}  removeBranch={removeBranch} handleBranchChanges={handleBranchChanges}/>);
    });

    it('Branch should add an employee while initializing', () => {
        const wrapper =  mount(<Branch branchIndex={0} branch={stub} length={1}  removeBranch={removeBranch} handleBranchChanges={handleBranchChanges}/>);
        expect(wrapper.state().branch.employees.length).toBe(1);
    })

    it('Branch handleComponentChanges function is called whenever there is any change in branch details', () => {
        spyOn(Branch.prototype,'handleComponentChanges').and.callThrough()
        spyOn(Branch.prototype,'handleChange').and.callThrough()
        const wrapper =  mount(<Branch branchIndex={0} branch={stub} length={1}  removeBranch={removeBranch} handleBranchChanges={handleBranchChanges}/>);
        const name = wrapper.find('[id="branch-description-0"]')
        name.simulate('change',{
            target: {
                value: 'abc'
            }
        })
        expect(Branch.prototype.handleChange).toHaveBeenCalled()
        expect(Branch.prototype.handleComponentChanges).toHaveBeenCalled()
    })

    it('Branch handleEmployeeChanges function is called whenever there is any change in employee details', () => {
        spyOn(Branch.prototype,'handleEmployeeChanges').and.callThrough()
        const wrapper =  mount(<Branch branchIndex={0} branch={stub} length={1}  removeBranch={removeBranch} handleBranchChanges={handleBranchChanges}/>);
        const name = wrapper.find('[id="employee-name-0"]')
        name.simulate('change',{
            target: {
                value: 'abc'
            }
        })
        expect(Branch.prototype.handleEmployeeChanges).toHaveBeenCalled()
    })

    it('Branch should remove an employee when remove link is clicked', () => {
        spyOn(Branch.prototype,'removeEmployee').and.callThrough()
        const wrapper =  mount(<Branch branchIndex={0} branch={stub} length={1}  removeBranch={removeBranch} handleBranchChanges={handleBranchChanges}/>);
        const button = wrapper.find('[id="button-add-employee"]')
        button.simulate('click')
        const link = wrapper.find('[id="remove-employee-1"]')
        link.simulate('click')
        expect(Branch.prototype.removeEmployee).toHaveBeenCalled()
        expect(wrapper.state().branch.employees.length).toBe(1);
    })
});

