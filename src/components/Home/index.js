import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdKeyboardArrowRight} from 'react-icons/md'

import NavBar from '../NavBar'
import ProductItem from '../ProductItem'
import Footer from '../Footer'
import './index.css'

const Home = props => {
  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
  const [activeCategory, setCategory] = useState('')
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  const changeActiveCategory = event => {
    console.log(props.location.hash)
    console.log(event.target.value)
    setCategory(event.target.value)
  }
  const getData = async () => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: null,
      errorMsg: null,
    })
    const apiUrl = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    if (response.ok === true) {
      setApiResponse(prev => ({
        ...prev,
        status: apiStatusConstants.success,
        data: responseData.categories,
      }))
    } else {
      setApiResponse(prev => ({
        ...prev,
        status: apiStatusConstants.failure,
        errorMsg: responseData.error_msg,
      }))
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#088C03" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiResponse
    return (
      <div className="home-main-container">
        <div className="home-sidebar">
          <h1 className="home-sidebar-heading">Categories</h1>
          <ul className="categories-container">
            {data.map(eachCategory => {
              const activeCategoryClass =
                activeCategory === eachCategory.name ? 'active-category' : ''
              return (
                <li
                  onClick={changeActiveCategory}
                  className={`category-item ${activeCategoryClass}`}
                >
                  <a
                    className="home-sidebar-categories"
                    href={`#${eachCategory.name}`}
                  >
                    {eachCategory.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="items-container">
          {data.map(eachCategory => (
            <div className="products-main-container" id={eachCategory.name}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 className="each-category-name">{eachCategory.name}</h1>
                <MdKeyboardArrowRight style={{marginTop: '5px'}} />
              </div>
              <ul className="products-container">
                {eachCategory.products.map(eachProduct => (
                  <ProductItem key={eachProduct.id} details={eachProduct} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1745179003/Group_7519_deg4bt.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something went wrong.</h1>
      <p className="failure-view-description">We are having some trouble.</p>
      <button type="button" className="failure-view-button" onClick={getData}>
        Retry
      </button>
    </div>
  )
  const renderHome = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return (
    <>
      <NavBar tab="Home" />
      {renderHome()}
      <Footer />
    </>
  )
}
export default Home
