import './index.css'

const CategoryContainer = props => {
  const {details, incrementCartItem, decrementCartItem, addCartItem, isInCart} =
    props
  const {name, weight, price, image} = details

  const increaseItem = () => {
    incrementCartItem(details)
  }
  const decreaseItem = () => {
    decrementCartItem(details)
  }
  const onClickAddButton = () => {
    addCartItem(details)
  }

  return (
    <li data-testid="product" className="product-item-container">
      <img src={image} alt={name} className="product-item-image" />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0px 4px',
        }}
      >
        <div>
          <p className="product-item-name-and-price">{name}</p>
          <p className="product-item-weight">{weight}</p>
          <p className="product-item-name-and-price">{price}</p>
        </div>
        {isInCart.length === 0 ? (
          <button
            data-testid="add-button"
            type="button"
            className="product-item-button"
            onClick={onClickAddButton}
          >
            Add
          </button>
        ) : (
          <div
            type="button"
            className="product-item-add-and-remove-button-container"
          >
            <button
              data-testid="decrement-count"
              type="button"
              className="product-item-add-and-remove-button"
              onClick={decreaseItem}
            >
              -
            </button>
            <p style={{margin: '0px'}} data-testid="active-count">
              {isInCart[0].count}
            </p>
            <button
              data-testid="increment-count"
              type="button"
              className="product-item-add-and-remove-button"
              style={{marginTop: '3px'}}
              onClick={increaseItem}
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
export default CategoryContainer
