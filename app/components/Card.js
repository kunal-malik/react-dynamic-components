import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

const Card = (props) => {
  const {heading} = props

  return (
    <div className='card-container'>
        <div className="card">
        <div className='card-top-bar' />
        <div className='card-body'>
          <h6 className='card-title' data-test-id={heading}>{heading}</h6>
          {props.children}
        </div>
        </div>
      </div>
  )
}

Card.propTypes = {
  heading: PropTypes.string
}

export default Card
