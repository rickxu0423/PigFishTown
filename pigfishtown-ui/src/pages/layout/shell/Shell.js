import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import './shell.scss'

import Header from 'src/pages/layout/header/Header'
// import SideBar from 'src/pages/layout/sidebar/SideBar'
import Dashboard from 'src/pages/dashboard/Dashboard'
import Shopping from 'src/pages/shopping/Shopping'
import Cooking from 'src/pages/cooking/Cooking'

function Shell () {
  return (
    <div className="shell-wrapper">
      <BrowserRouter>
        <Header />
        {/* <SideBar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="shopping" element={<Shopping />} />
          <Route path="cooking" element={<Cooking />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Shell