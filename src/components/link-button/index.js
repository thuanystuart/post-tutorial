import React, { PreComponent, PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import styles from './styles.css'

export const buttonColors = ['default', 'inherit', 'primary', 'secondary']

export const buttonSizes = ['small', 'medium', 'large']

export const buttonVariants = [
  'text',
  'flat',
  'outlined',
  'contained',
  'raised',
  'fab',
  'extendedFab',
]

class LinkButton extends PureComponent {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    color: PropTypes.oneOf(buttonColors),
    size: PropTypes.oneOf(buttonSizes),
    variant: PropTypes.oneOf(buttonVariants),
  }

  static defaultProps = {
    to: '/',
    children: '',
    onClick: () => {},
    color: 'primary',
    size: 'medium',
    variant: 'contained',
  }

  handleOnClick = event => {
    onClick && onClick(event)
    this.props.history.push(this.props.to)
  }

  render() {
    const {
      children,
      to,
      onClick,
      color,
      disabled,
      size,
      variant,
      history,
      location,
      match,
      staticContext,
    } = this.props

    return (
      <div>
        <Button
          className={styles.button}
          disabled={disabled}
          color={color}
          size={size}
          variant={variant}
          onClick={this.handleOnClick}
        >
          {children}
        </Button>
      </div>
    )
  }
}

export default withRouter(LinkButton)
