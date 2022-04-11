import PropTypes from 'prop-types'
import './pftbutton.scss'

function PftButton (props) {

  const getWrapperClass = props => {
    let classNames = 'pft-button-wrapper'
    if (props.className) classNames += (' ' + props.className)
    if (props.shadow) classNames += ' shadow'
    return classNames
  }

  const getButtonClass = props => {
    let classNames = 'pft-button'
    if (props.shadow) classNames += ' shadow'
    return classNames
  }

  const handleClick = props.handleClick || (() => {})

  return (
    <div className={ getWrapperClass(props) }>
      <button className={ getButtonClass(props) } onClick={ handleClick }>{ props.label }</button>
    </div>
  )
}

PftButton.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  shadow: PropTypes.bool
}

PftButton.defaultProps = {
  label: '',
  field: '',
  shadow: false
}

export default PftButton