import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdKeyboardArrowRight} from 'react-icons/md'

import NavBar from '../NavBar'
import MobileNavbar from '../MobileNavbar'
import ProductItem from '../ProductItem'
import Footer from '../Footer'
import './index.css'

const Home = () => {
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
  const [cartData, setCartdData] = useState(
    localStorage.getItem('cartData') === null
      ? []
      : JSON.parse(localStorage.getItem('cartData')),
  )
  //  console.log(cartData)
  const incrementCartItem = newItem => {
    const newList = cartData.map(eachItem => {
      if (newItem.id === eachItem.id) {
        return {
          id: eachItem.id,
          name: eachItem.name,
          weight: eachItem.weight,
          price: eachItem.price,
          image: eachItem.image,
          count: eachItem.count + 1,
        }
      }
      return eachItem
    })
    setCartdData(newList)
    localStorage.setItem('cartData', JSON.stringify(newList))
  }
  const decrementCartItem = newItem => {
    const newCartItems = cartData.map(eachItem => {
      if (newItem.id === eachItem.id) {
        return {
          id: eachItem.id,
          name: eachItem.name,
          weight: eachItem.weight,
          price: eachItem.price,
          image: eachItem.image,
          count: eachItem.count - 1,
        }
      }
      return eachItem
    })

    const newList = newCartItems.filter(eachItem => {
      if (eachItem.count < 1) {
        return false
      }
      return true
    })
    setCartdData(newList)
    localStorage.setItem('cartData', JSON.stringify(newList))
  }
  const addCartItem = newItem => {
    const isPresent = cartData.filter(eachItem => {
      if (newItem.id === eachItem.id) {
        return true
      }
      return false
    })
    if (isPresent.length === 0) {
      setCartdData(prev => [...prev, {...newItem, count: 1}])
      localStorage.setItem(
        'cartData',
        JSON.stringify([...cartData, {...newItem, count: 1}]),
      )
    } else {
      const newList = cartData.map(eachItem => {
        if (newItem.id === eachItem.id) {
          return {
            id: eachItem.id,
            name: eachItem.name,
            weight: eachItem.weight,
            price: eachItem.price,
            image: eachItem.image,
            count: eachItem.count + 1,
          }
        }
        return eachItem
      })
      setCartdData(newList)
      localStorage.setItem('cartData', JSON.stringify(newList))
    }
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
      <>
        <div>
          <ul className="home-mobile-categories-bar">
            {data.map(eachCategory => {
              const activeCategoryClass =
                activeCategory === eachCategory.name
                  ? 'active-mobile-category-box'
                  : ''
              const activeCategoryName =
                activeCategory === eachCategory.name
                  ? 'active-mobile-category-name'
                  : ''
              const changeActiveCategory = () => {
                setCategory(eachCategory.name)
              }
              return (
                <li
                  className="mobile-category-item"
                  id={`${eachCategory.name} category`}
                  key={`${eachCategory.name} category`}
                >
                  <a
                    onClick={changeActiveCategory}
                    className={`mobile-category-box ${activeCategoryClass}`}
                    href={`#${eachCategory.name}`}
                  >
                    hi
                  </a>
                  <p className={`home-mobile-categories ${activeCategoryName}`}>
                    {eachCategory.name}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="home-main-container">
          <div className="home-sidebar">
            <h1 className="home-sidebar-heading">Categories</h1>
            <ul className="categories-container">
              {data.map(eachCategory => {
                const activeCategoryClass =
                  activeCategory === eachCategory.name ? 'active-category' : ''
                const activeCategoryName =
                  activeCategory === eachCategory.name
                    ? 'active-category-name'
                    : ''
                const changeActiveCategory = () => {
                  setCategory(eachCategory.name)
                }
                return (
                  <li
                    className={`category-item ${activeCategoryClass}`}
                    id={`${eachCategory.name} category`}
                    key={`${eachCategory.name} category`}
                  >
                    <a
                      onClick={changeActiveCategory}
                      className={`home-sidebar-categories ${activeCategoryName}`}
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
              <div
                className="products-main-container"
                key={eachCategory.name}
                id={eachCategory.name}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1 className="each-category-name">{eachCategory.name}</h1>
                    <MdKeyboardArrowRight style={{marginTop: '5px'}} />
                  </div>
                  <p className="category-view-all">View All</p>
                </div>
                <ul className="products-container">
                  {eachCategory.products.map(eachProduct => {
                    const isInCart = cartData.filter(eachItem => {
                      if (eachItem.id === eachProduct.id) return true
                      return false
                    })
                    return (
                      <ProductItem
                        key={eachProduct.id}
                        details={eachProduct}
                        incrementCartItem={incrementCartItem}
                        decrementCartItem={decrementCartItem}
                        addCartItem={addCartItem}
                        isInCart={isInCart}
                      />
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </>
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
      <MobileNavbar tab="Home" />
      <Footer />
    </>
  )
}
export default Home
