import './App.scss'
import Shell from 'src/pages/layout/shell/Shell'
import { PftNotify } from 'src/common/notify/PftNotify'

function App() {
  return (
    <div className="App">
      <Shell />
      <PftNotify floatingTime={ 1500 } />
    </div>
  )
}

export default App
