import { useState } from 'react'
import PropTypes from 'prop-types'
import './pftmodal.scss'

import PftButton from 'src/common/button/PftButton'
import PftInput from 'src/common/input/PftInput'

function PftModal (props) {
  const [localModalData, setLocalModalData] = useState(props.modalData)

  const onInput = (event) => {
    setLocalModalData({
      ...localModalData,
      label: event.target.value
    })
  }

  const onAddOne = () => {
    const newLocalModalData = { ...localModalData }
    newLocalModalData.number += 1
    setLocalModalData(newLocalModalData)
  }

  const onReduceOne = () => {
    const newLocalModalData = { ...localModalData }
    if (newLocalModalData.number > 1) {
      newLocalModalData.number -= 1
    }
    setLocalModalData(newLocalModalData)
  }

  const onConfirm = () => {
    return props.onConfirm(localModalData)
  }

  const getModalField = () => {
    return (
      <div className="modal-field">
        {
          localModalData.message &&
          <label className="modal-message">{ localModalData.message }</label>
        }
        {
          localModalData.label !== undefined &&
          <PftInput type={ 'textArea' } modelValue={ localModalData.label } onInput={ onInput } />
        }
        { 
          localModalData.number &&
          <div className="number-controller">
            <PftButton label="-" field="reduceOne" handleClick={ onReduceOne } />
            <label className="number-label">{ localModalData.number }</label>
            <PftButton label="+" field="addOne" handleClick={ onAddOne }/>
          </div>
        }
      </div>
    )
  }

  return (
    <div className="pft-modal-wrapper">
      <div className="pft-modal">
        { getModalField(props) }
        <div className="button-wrapper">
          <button className="confirm" onClick={ onConfirm }>{ props.confirmLabel }</button>
          <button className="cancel" onClick={ props.onCancel }>{ props.cancelLabel }</button>
        </div>
      </div>
    </div>
  )
}

PftModal.propTypes = {
  className: PropTypes.string,
  modalData: PropTypes.object,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

PftModal.defaultProps = {
  modalData: {},
  confirmLabel: 'confirm',
  cancelLabel: 'cancel',
  onConfirm: () => {},
  onCancel: () => {}
}

export default PftModal