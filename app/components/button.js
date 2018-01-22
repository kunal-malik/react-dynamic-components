import React, {Component} from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

class ButtonComponent extends Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        e.preventDefault()
        this.props.onClick()
    }

    render(){
        return(
            <div className="input-button-container">
                <button
                type={this.props.type}
                id={this.props.id}
                className="button-default"
                onClick={this.handleClick}>
                {this.props.buttonLabel}
                </button>
                </div>
        )
    }
}

ButtonComponent.PropTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string,
    id: PropTypes.string,
    buttonLabel: PropTypes.string,
}

export default ButtonComponent