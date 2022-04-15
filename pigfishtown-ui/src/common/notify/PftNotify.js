import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import './pftnotify.scss'

import PftNotifyIcon from './PftNotifyIcon'

function PftNotify (props) {
  const [notify, setNotify] = useState([])

  const notifyHandler = useCallback(({ detail }) => {
    setNotify(prevNotify => [...prevNotify, detail])
    setTimeout(() => {
      setNotify(prevNotify => prevNotify.slice(1, prevNotify.length))
    }, props.floatingTime)
  }, [])

  useEffect(() => {
    window.addEventListener('toastNotify', notifyHandler)
    return () => {
      window.removeEventListener('toastNotify', notifyHandler)
    }
  })

  return (
    <div className="notify-wrapper">
      { notify.map(({ message, type }, index) => (
        <div className="notify-content" key={ index }>
          <PftNotifyIcon type={ type } />
          <p>{ message }</p>
        </div>
      )) }
    </div>
  )
}

PftNotify.propTypes = {
  floatingTime: PropTypes.number
}

PftNotify.defaultProps = {
  floatingTime: 3000
}

const notify = detail => {
  window.dispatchEvent(
    new CustomEvent('toastNotify', { detail })
  )
}

export { PftNotify, notify }