import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Cart from './components/Cart'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

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

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route component={NotFound} />
  </Switch>
)

export default App
