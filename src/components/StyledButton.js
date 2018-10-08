import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const StyledButton = (props) => (
  <Button
    {...props}
    style={{ ...props.style, fontFamily: '"Rubik", sans-serif' }}
  >
    {props.children}
  </Button>
)

StyledButton.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any
}

export default StyledButton
