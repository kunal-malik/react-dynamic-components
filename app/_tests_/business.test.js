import React from 'react';
import ReactDOM from 'react-dom';
import Business from '../components/business'
import { shallow, mount } from 'enzyme';

describe('Business component ', () => {
    let handleBranchChanges = jest.fn()
    it('Business renders without crashing', () => {
     shallow(<Business/>);
    });

    it('Business should add a branch while initializing', () => {
        const wrapper =  mount(<Business/>);
        expect(wrapper.state().branches.length).toBe(1);
    })

    it('Business should display remove link only when more than one branch exists', () => {
        const wrapper =  mount(<Business/>);
        const link = wrapper.find('[id="remove-branch-0"]')
        expect(link.exists()).toBe(false);
        const button = wrapper.find('[id="button-add-branch"]')
        button.simulate('click')
        const link1 = wrapper.find('[id="remove-branch-0"]')
        expect(link1.exists()).toBe(true);
    })

    it('Business handleBranchChanges function is called whenever there is any change in branch details', () => {
        spyOn(Business.prototype,'handleBranchChanges').and.callThrough()
        const wrapper =  mount(<Business/>);
        const name = wrapper.find('[id="branch-name-0"]')
        name.simulate('change',{
            target: {
                value: 'abc'
            }
        })
        expect(Business.prototype.handleBranchChanges).toHaveBeenCalled()
    })

    it('Business should add a branch when add branch button is clicked', () => {
        const wrapper =  mount(<Business/>);
        const button = wrapper.find('[id="button-add-branch"]')
        button.simulate('click')
        expect(wrapper.state().branches.length).toBe(2);
    })

    it('Business should remove a branch when remove link is clicked', () => {
        spyOn(Business.prototype,'removeBranch').and.callThrough()
        const wrapper =  mount(<Business/>);
        const button = wrapper.find('[id="button-add-branch"]')
        button.simulate('click')
        const link = wrapper.find('[id="remove-branch-0"]')
        link.simulate('click')
        expect(Business.prototype.removeBranch).toHaveBeenCalled()
        expect(wrapper.state().branches.length).toBe(1);
    })
});

