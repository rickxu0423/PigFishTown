// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { appList } from 'src/config/appList'
import PftButton from 'src/common/button/PftButton'
import './dashboard.scss'

function Dashboard () {
  const navigate = useNavigate()

  const handleClick = field => {
    navigate(field)
  }

  const appToRender = appList.map(app => {
    return (
      <PftButton
        key={ app.field }
        label={ app.label }
        field={ app.field }
        shadow={ true }
        handleClick={ () => handleClick(app.field) }
      />
    )
  })
  return (
    <div className="dashboard-wrapper">
      <div className="button-list">
        { appToRender }
      </div>
    </div>
  )
}

export default Dashboard