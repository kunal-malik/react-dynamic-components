import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../components/button'
import { shallow, mount } from 'enzyme';

describe('Button component ', () => {
    const onClick = jest.fn()
    it('Button renders without crashing', () => {
     shallow(<Button  type='submit'  buttonLabel='+ Add Branch' id='button-add-branch'  onClick={onClick}/>);
    })
});