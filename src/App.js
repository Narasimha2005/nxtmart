import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Cart from './components/Cart'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'
// {
//       id: 1,
//       image:
//         'https://new-assets.ccbp.in/frontend/react-js/nxt-mart-app/image_1.jpg',
//       name: 'Orange',
//       price: '₹100',
//       weight: '1kg',
//       count: 1,
//     },
const App = () => {
  const [cartItems, setCartItems] = useState([])
  const incrementCartItem = newItem => {
    const newList = cartItems.map(eachItem => {
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
    setCartItems(newList)
  }
  const decrementCartItem = newItem => {
    const newCartItems = cartItems.map(eachItem => {
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
    setCartItems(newList)
  }
  const addCartItem = newItem => {
    const isPresent = cartItems.filter(eachItem => {
      if (newItem.id === eachItem.id) {
        return true
      }
      return false
    })
    if (isPresent.length === 0) {
      setCartItems([...cartItems, {...newItem, count: 1}])
    } else {
      const newList = cartItems.map(eachItem => {
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
      setCartItems(newList)
    }
  }
  const clearCartItems = () => {
    setCartItems([])
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        incrementCartItem,
        decrementCartItem,
        clearCartItems,
      }}
    >
      <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/cart' component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
