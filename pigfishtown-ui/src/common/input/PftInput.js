import PropTypes from 'prop-types'
import './pftinput.scss'

function PftInput (props) {

  const getWrapperClass = props => {
    let classNames = 'pft-input-wrapper'
    if (props.className) classNames += (' ' + props.className)
    return classNames
  }

  const getButtonClass = () => {
    let classNames = 'pft-input'
    return classNames
  }

  const onInput = props.onInput

  const getControlField = (props) => {
    if (props.type === 'textArea') {
      return (
        <textarea
          className={ getButtonClass(props) }
          value={ props.modelValue }
          onChange={ onInput }
        />
      )
    } else {
      return (
        <input
          className={ getButtonClass(props) }
          type="text" value={ props.modelValue }
          onChange={ onInput } />
      )
    }
  }

  return (
    <div className={ getWrapperClass(props) }>
      { getControlField(props) }
    </div>
  )
}

PftInput.propTypes = {
  type: PropTypes.string,
  modelValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  onInput: PropTypes.func
}

PftInput.defaultProps = {
  type: 'input',
  modelValue: '',
  onInput: () => {}
}

export default PftInput