import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const NavBar = props => {
  const {tab} = props
  const homeActive = tab === 'Home' ? 'active' : ''
  const cartActive = tab === 'Cart' ? 'active' : ''
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1744953177/Logo_2_nvykhc.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-links-container">
        <Link to="/" className="nav-link">
          <li>
            <p className={`nav-link-name ${homeActive}`}>Home</p>
            {tab === 'Home' ? <hr className="horizontal-line" /> : null}
          </li>
        </Link>
        <Link to="/cart" className="nav-link">
          <li>
            <p className={`nav-link-name ${cartActive}`}>Cart</p>
            {tab === 'Cart' ? <hr className="horizontal-line" /> : null}
          </li>
        </Link>
        <li className="nav-link">
          <button
            type="button"
            className="nav-logout-button"
            onClick={onLogout}
          >
            <img
              src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1744958532/logout_xijymm.png"
              alt="logout"
              className="logout-logo"
            />
            <p className="nav-link-name">Logout</p>
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(NavBar)
