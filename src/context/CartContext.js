import React from 'react'

const CartContext = React.createContext({
  cartItems: [],
  addCartItem: () => {},
  incrementCartItem: () => {},
  decrementCartItem: () => {},
  clearCartItems: () => {},
})

export default CartContext
