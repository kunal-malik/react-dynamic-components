import React, {Component} from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import {form} from 'react-bootstrap'
import {FormGroup} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Employee from './employee'
import ButtonComponent from './button'
import employeeClass from '../classes/employeeClass'

class Branch extends Component {

    constructor(props){
        super(props)
        this.initializeState(props)
        this.handleChange=this.handleChange.bind(this)
        this.removeBranch = this.removeBranch.bind(this)
        this.addEmployee = this.addEmployee.bind(this)
        this.removeEmployee = this.removeEmployee.bind(this)
        this.handleEmployeeChanges = this.handleEmployeeChanges.bind(this)
        this.handleComponentChanges = this.handleComponentChanges.bind(this)
    }

    initializeState(props) {
        
        const {branch, branchIndex} = this.props
        this.state = {
            branch,
            branchIndex
        }
    }

     componentWillReceiveProps(nextProps){
        const {branch, branchIndex} = nextProps
        this.setState({
            branch: branch,
            branchIndex: branchIndex
        })
    }
      handleChange(name, value) {
        let {branch, branchIndex} = this.state
        branch[name] = value
        this.setState({
            branch: {
                ...branch
            }
        }, () => this.handleComponentChanges(this.state.branch))
    } 
    
    removeBranch(){
        const {branchIndex} = this.state
        this.props.removeBranch(branchIndex)
    }

   addEmployee() {
    const {branch} = this.state
    branch.employees.push(new employeeClass())
    this.setState({branch: 
        branch}, 
        () => this.handleComponentChanges(this.state.branch))
    } 

    removeEmployee(employeeIndex) {
        const {branch} = this.state
        branch.employees.splice(employeeIndex,1)
        this.setState({branch: 
            branch}, 
            () => this.handleComponentChanges(this.state.branch))
    }

     handleEmployeeChanges(employee, employeeIndex){
        const {branch} = this.state
        let {employees} = branch
        employees[employeeIndex] = employee
        this.setState({branch: {
            ...branch
        }}, () => 
        {
            this.handleComponentChanges(this.state.branch)
        })
    } 
    
    handleComponentChanges(branch){
        this.props.handleBranchChanges(branch, this.props.branchIndex)
    }

    render(){
        const {branch, branchIndex} = this.state
        const {employees} = branch
        const {name, description} = branch
        return(
            <div className="branch-container">
                <div className="row">
          <div className="col-lg-12">
                <form>
                <hr/>
				<FormGroup
					controlId="formBasicText"
				>
                <div className="row">
          <div className="col-lg-5">

          <div className="form-group">
    <label htmlFor="name">Branch Name</label>
    <input type="text" className="form-control" id={`branch-name-${branchIndex}`} placeholder="Enter name"
    value={name} 
    onChange={(e) => this.handleChange('name',e.target.value)}/>
  </div>
                    </div>
                    {this.props.length > 1 ?
                    <div className="col-lg-7">
                        <div className="remove-link pull-right">
                    <Button bsStyle="link" id={`remove-branch-${branchIndex}`} onClick={this.removeBranch}>Remove</Button>
                    </div>
                        </div> : null
                    }
                        </div>

                        <div className="row">
                        <div className="col-lg-7">
                        <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id={`branch-description-${branchIndex}`} placeholder="Enter description"
    value={description} 
    onChange={(e) => this.handleChange('description',e.target.value)}/>
  </div>
  </div>
  </div>
                     {employees.map((employee,index) => <Employee 
        ref={`employee-${index}`}
        key={`employee-${index}`}
        employeeIndex={index}
        employee={employee}
        length={employees.length}
        removeEmployee={this.removeEmployee}
        handleEmployeeChanges={(employee, employeeIndex) => this.handleEmployeeChanges(employee, employeeIndex)}
        />)} 
        <div className="pull-right">
         <ButtonComponent type="submit" buttonLabel="+ Add Employee" id="button-add-employee" onClick={this.addEmployee}/>
        </div>
        <br/>

				</FormGroup>
			</form>
                </div>
                </div>
                </div>
        )
    }

}

Branch.PropTypes = {
    branchIndex: PropTypes.number,
    branch: PropTypes.object,
    length: PropTypes.number,
    removeBranch: PropTypes.func,
    handleBranchChanges: PropTypes.func,

}

export default Branch