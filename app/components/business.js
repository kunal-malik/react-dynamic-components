import React, { Component } from 'react'
import { render } from 'react-dom'
// import PropTypes from 'prop-types'
import Branch from './branch'
// import Employee from '../employee'
import ButtonComponent from './button'
import employeeClass from '../classes/employeeClass'
import branchClass from '../classes/branchClass'
import { Jumbotron } from 'react-bootstrap'
import Card from './card'

/** This is the main class for rendering all the components displayed on screen */
class Business extends Component {

  constructor (props) {
    super(props)
    this.addBranch = this.addBranch.bind(this)
    this.createBranch = this.createBranch.bind(this)
    this.removeBranch = this.removeBranch.bind(this)
    this.handleBranchChanges = this.handleBranchChanges.bind(this)
    this.initializeState()
  }

  initializeState () {
    let {branches} = []
      const defaultBranch = this.createBranch()
      branches = [defaultBranch]
    this.state = {
    branches}
  }

  createBranch () {
    let branchObject = new branchClass()
    branchObject.employees.push(new employeeClass())
    return branchObject
  }

  addBranch () {
    const {branches} = this.state
    let defaultBranch = this.createBranch()
    branches.push(defaultBranch)
    this.setState({branches: branches})
  }

  removeBranch (index) {
    const {branches} = this.state
    branches.splice(index, 1)
    this.setState({branches: branches})
  }

  handleBranchChanges (branch, branchIndex) {
    const {branches} = this.state
    branches[branchIndex] = branch
    this.setState({branches: branches})
  }

  render () {
    const {branches} = this.state
    return (
      <div className='business-container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Card heading='Business details'>
              <label className="business-label">
                Input details of the business
              </label>
              {branches.map((branch,index) => <Branch 
                                       ref={`branch-${index}`}
                                       key={`branch-${index}`}
                                       branchIndex={index}
                                       branch={branch}
                                       length={branches.length}
                                       removeBranch={this.removeBranch}
                                       handleBranchChanges={(branch, branchIndex) => this.handleBranchChanges(branch, branchIndex)}
                                       />)}
              <div className='pull-right'>
                <ButtonComponent
                  type='submit'
                  buttonLabel='+ Add Branch'
                  id='button-add-branch'
                  onClick={this.addBranch} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default Business
