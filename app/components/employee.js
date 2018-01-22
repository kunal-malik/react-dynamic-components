import React, {Component} from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import {FormGroup} from 'react-bootstrap'
import {FormControl} from 'react-bootstrap'
import {ControlLabel} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

class Employee extends Component {

    constructor(props){
        super(props)
        this.initializeState(props)
        this.handleChange=this.handleChange.bind(this)
        this.removeEmployee = this.removeEmployee.bind(this)
    }

    initializeState(props) {
        const {employee, employeeIndex} = this.props
        this.state = {
            employee,
            employeeIndex
        }
    }

    componentWillReceiveProps(nextProps){
        const {employee, employeeIndex} = nextProps
        this.setState({
            employee: employee,
            employeeIndex: employeeIndex
        })
    }

    handleChange(name, value) {
        let {employee, employeeIndex} = this.state
        employee[name] = value
        this.setState({
            employee: {
                ...employee
            }
        }, () => this.props.handleEmployeeChanges(this.state.employee, employeeIndex))
    }
    
    removeEmployee(){
        const {employeeIndex} = this.state
        this.props.removeEmployee(employeeIndex)
    }

    render(){
        const {employee, employeeIndex} = this.state
        const {name, designation, gender} = employee
        return(
            <div className="employee-container">
                <div className="row">
                    <div className="col-lg-12">
                            <div className="row">
                            <div className="col-lg-5">

                            <div className="form-group">
    <label className="employee-name-label" htmlFor="name">{employeeIndex+1}. Employee Name</label>
    <input type="text" className="form-control" id={`employee-name-${employeeIndex}`} placeholder="Enter name" 
    value={name}
    onChange={(e) => this.handleChange('name',e.target.value)}/>
  </div>
                    </div>
                    {this.props.length > 1 ?
                    <div className="col-lg-7">
                        <div className="remove-link pull-right">
                    <Button bsStyle="link" id={`remove-employee-${employeeIndex}`} onClick={this.removeEmployee}>Remove</Button>
                    </div>
                        </div> : null
                    }
                        </div>

                        <div className="row">
                        <div className="col-lg-2">

          <div className="form-group">
    <label className="employee-label" htmlFor="gender">Gender</label>
    <input type="text" className="form-control" id={`employee-gender-${employeeIndex}`} placeholder="Enter gender"
    value={gender} 
    onChange={(e) => this.handleChange('gender',e.target.value)}/>
  </div>

                    </div>
          <div className="col-lg-6">

          <div className="form-group">
    <label className="employee-label" htmlFor="designation">Designation</label>
    <input type="text" className="form-control" id={`employee-designation-${employeeIndex}`} placeholder="Enter designation" 
    value={designation}
    onChange={(e) => this.handleChange('designation',e.target.value)}/>
  </div>

                        

                    </div>
         
                </div>
                </div>
                </div>
                </div>
        )
    }

}

Employee.PropTypes = {
    employeeIndex: PropTypes.number,
    employee: PropTypes.object,
    length: PropTypes.number,
    removeEmployee: PropTypes.func,
    handleEmployeeChanges: PropTypes.func,

}

export default Employee