import {Link, withRouter} from 'react-router-dom'
import {FiHome, FiShoppingCart} from 'react-icons/fi'

import Cookies from 'js-cookie'
import './index.css'

const MobileNavbar = props => {
  const {tab} = props
  const homeActive = tab === 'Home' ? 'mobile-active' : ''
  const cartActive = tab === 'Cart' ? 'mobile-active' : ''
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="mobile-header-container">
      <ul className="mobile-nav-links-container">
        <Link to="/" className="mobile-nav-link">
          <li className={homeActive}>
            <FiHome style={{width: '24px', height: '24px'}} />
          </li>
        </Link>
        <Link to="/cart" className="mobile-nav-link">
          <li className={cartActive}>
            <FiShoppingCart style={{width: '24px', height: '24px'}} />
          </li>
        </Link>
        <li className="mobile-nav-link">
          <button
            type="button"
            className="mobile-nav-logout-button"
            onClick={onLogout}
          >
            <img
              src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1744958532/logout_xijymm.png"
              alt="logout"
              className="mobile-logout-logo"
            />
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(MobileNavbar)
