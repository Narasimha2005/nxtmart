import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

import NavBar from '../NavBar'
import Footer from '../Footer'
import CartItem from '../CartItem'
import MobileNavbar from '../MobileNavbar'
import './index.css'

const Cart = props => {
  const [checkedout, setcheckedout] = useState(false)
  const [cartData, setCartdData] = useState(
    localStorage.getItem('cartData') === null
      ? []
      : JSON.parse(localStorage.getItem('cartData')),
  )

  const clearCartItems = () => {
    localStorage.clear()
  }

  const onClickCheckout = () => {
    setcheckedout(true)
    clearCartItems()
  }

  const renderEmptyCartView = () => (
    <div className="checkout-main-container">
      <div className="checkout-card-container">
        <img
          src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1745178672/Group_8_iis5pu.png"
          alt="empty cart"
        />
        <h1 className="empty-cart-heading">Your cart is empty</h1>
      </div>
    </div>
  )

  const renderCartItems = () => {
    let totalAmount = 0
    cartData.forEach(eachItem => {
      const {price, count} = eachItem
      totalAmount += parseInt(price.slice(1, price.length)) * count
    })

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

    if (cartData.length > 0) {
      return (
        <div className="cart-main-container">
          <h1 className="cart-main-heading">Items</h1>
          <div className="cart-mobile-heading-container">
            <Link to="/">
              <BsArrowLeft />
            </Link>
            <h1 className="cart-mobile-main-heading">Checkout</h1>
          </div>
          <p className="cart-item-count">
            Items (<span>{cartData.length}</span>)
          </p>
          <div className="cart-items-sub-container">
            <ul className="cart-items-list-container">
              {cartData.map(eachItem => (
                <CartItem
                  key={eachItem.id}
                  details={eachItem}
                  incrementCartItem={incrementCartItem}
                  decrementCartItem={decrementCartItem}
                />
              ))}
            </ul>
            <div className="cart-total-amount-container">
              <h1 className="cart-total-amount" data-testid="total-price">
                Total ({cartData.length} items) : ₹ {totalAmount}
              </h1>
              <button
                type="button"
                className="checkout-button"
                onClick={onClickCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )
    }
    return renderEmptyCartView()
  }

  const renderpaymentView = () => {
    const onClickreturnButton = () => {
      const {history} = props
      history.replace('/')
    }
    return (
      <div className="checkout-main-container">
        <div className="checkout-card-container">
          <img
            src="https://res.cloudinary.com/dvgpe4x6t/image/upload/v1745177320/Group_7417_anbuzx.png"
            alt="payment success"
          />
          <h1 className="payment-page-heading">Payment Successful</h1>
          <p className="payment-page-description">
            Thank you for ordering.
            <br />
            Your payment is successfully completed.
          </p>
          <button
            type="button"
            onClick={onClickreturnButton}
            className="return-to-home-button"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    )
  }
  return (
    <>
      <NavBar tab="Cart" />
      {checkedout ? renderpaymentView() : renderCartItems()}
      <MobileNavbar tab="Cart" />
      <Footer />
    </>
  )
}
export default Cart
