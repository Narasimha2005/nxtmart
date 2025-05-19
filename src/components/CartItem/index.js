import './index.css'

const CartItem = props => {
  const {details, incrementCartItem, decrementCartItem} = props
  const {name, price, image, weight, count} = details
  const increaseItem = () => {
    incrementCartItem(details)
  }
  const decreaseItem = () => {
    decrementCartItem(details)
  }
  return (
    <li className="cart-list-item">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        data-testid="cartItem"
      >
        <div style={{display: 'flex'}}>
          <img src={image} alt={name} className="cart-item-image" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p className="cart-item-name-and-price">{name}</p>
            <p className="cart-item-weight">{weight}</p>
            <p className="cart-item-name-and-price">{price}</p>
          </div>
        </div>
        <div
          type="button"
          className="cart-item-add-and-remove-button-container"
        >
          <button
            data-testid="decrement-quantity"
            type="button"
            className="cart-item-add-and-remove-button"
            onClick={decreaseItem}
          >
            -
          </button>
          <p style={{margin: '0px'}} data-testid="item-quantity">
            {count}
          </p>
          <button
            data-testid="increment-quantity"
            type="button"
            className="cart-item-add-and-remove-button"
            style={{marginTop: '3px'}}
            onClick={increaseItem}
          >
            +
          </button>
        </div>
      </div>
      <hr className="cart-item-hr" />
    </li>
  )
}

export default CartItem
