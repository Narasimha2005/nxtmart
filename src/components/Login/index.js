import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState({show: false, errorMsg: ''})

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const activeButton = name !== '' && password !== '' ? 'active-button' : null
  const onChangeName = event => {
    setName(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onLogin = async event => {
    event.preventDefault()
    if (name !== '' && password !== '') {
      const creds = {
        username: name,
        password,
      }
      const apiUrl = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(creds),
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        const {history} = props
        history.replace('/')
      } else {
        const apiErrorMsg = data.error_msg
        setErrorMsg({show: true, errorMsg: apiErrorMsg})
        setName('')
        setPassword('')
      }
    }
  }
  const onClickCheckbox = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="login-container">
      <form onSubmit={onLogin} className="login-card">
        <img
          src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1744953177/Logo_2_nvykhc.png"
          alt="login website logo"
          className="login-logo"
        />
        <div>
          <label htmlFor="username" className="login-label">
            Username
          </label>
          <div className="login-input-box">
            <img
              src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1744954222/profile-circle_zoynog.png"
              alt="login profile iamge"
            />
            <input
              id="username"
              type="text"
              className="login-input"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <div className="login-input-box">
            <img
              src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1744954122/Group_14_vv0bdk.png"
              alt="login password iamge"
            />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="login-input"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className="login-show-password-box">
            <input
              type="checkbox"
              id="showpassword"
              className="login-checkbox"
              onClick={onClickCheckbox}
            />
            <label htmlFor="showpassword" className="login-show-password">
              Show Password
            </label>
          </div>
          <button type="submit" className={`button ${activeButton}`}>
            Login
          </button>
        </div>
        {errorMsg.show ? (
          <p className="login-error-msg">{errorMsg.errorMsg}</p>
        ) : null}
      </form>
    </div>
  )
}
export default Login
