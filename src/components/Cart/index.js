import {useState, useEffect} from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = props => {
  const [checkedout, setcheckedout] = useState(false)
  const onClickCheckout = () => {
    setcheckedout(true)
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
  const renderCartItems = () => (
    <CartContext.Consumer>
      {value => {
        const {cartItems, incrementCartItem, decrementCartItem} = value
        console.log(cartItems)
        let totalAmount = 0
        cartItems.map(eachItem => {
          const {price} = eachItem
          totalAmount += parseInt(price.slice(1, price.length))
          return eachItem
        })
        if (cartItems.length > 0) {
          return (
            <div className="cart-main-container">
              <h1 className="cart-main-heading">Items</h1>
              <div className="cart-items-sub-container">
                <ul className="cart-items-list-container">
                  {cartItems.map(eachItem => (
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
                    Total ({cartItems.length} items) : ₹ {totalAmount}
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
      }}
    </CartContext.Consumer>
  )
  const renderpaymentView = () => (
    <CartContext.Consumer>
      {value => {
        const {clearCartItems} = value
        const onClickreturnButton = () => {
          const {history} = props
          clearCartItems()
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
      }}
    </CartContext.Consumer>
  )

  return (
    <>
      <NavBar tab="Cart" />
      {checkedout ? renderpaymentView() : renderCartItems()}
      <Footer />
    </>
  )
}
export default Cart
