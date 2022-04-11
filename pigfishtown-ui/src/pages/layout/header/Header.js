import { useNavigate } from 'react-router-dom'
import PftButton from 'src/common/button/PftButton'
import './header.scss'

function Header () {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className="header-wrapper sticky">
      <PftButton
        label="Home"
        field="home"
        handleClick={ handleClick }
      />
      <label>Pig Fish Town</label>
    </div>
  )
}

export default Header