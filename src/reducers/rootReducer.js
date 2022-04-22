const localState = {
  // set initial state to localstorage if available
  // set to default if not
  selectedCurrency: JSON.parse(localStorage.getItem('selectedCurrency')) || {
    label: 'USD',
    symbol: '$',
  },
  cart: JSON.parse(localStorage.getItem('cart')) || [],
}

const rootReducer = (state = localState, action) => {
  if (action.type === 'CHANGE_CURRENCY') {
    localStorage.setItem(
      'selectedCurrency',
      JSON.stringify({
        label: action.currency.label,
        symbol: action.currency.symbol,
      }),
    )
    return {
      ...state,
      selectedCurrency: {
        label: action.currency.label,
        symbol: action.currency.symbol,
      },
    }
  }
  if (action.type === 'ADD_PRODUCT') {
    // if cart has items
    if (state.cart.length > 0) {
      // spread previous items and add new item
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.cart, action.product]),
      )
      return {
        ...state,
        cart: [...state.cart, action.product],
      }
      // if cart is empty
    } else {
      // add item to cart
      localStorage.setItem('cart', JSON.stringify([action.product]))
      return {
        ...state,
        cart: [action.product],
      }
    }
  }
  if (action.type === 'INCREMENT_QUANTITY') {
    if (!state.cart) {
      return
    } else {
      // if there is a selected quantity
      if (action.amount) {
        let newCart = []
        // find item you want to increment
        // and increment by selected quantity
        state.cart.map((item, i) =>
          i === action.index
            ? newCart.push({ ...item, quantity: item.quantity + action.amount })
            : newCart.push(item),
        )
        localStorage.setItem('cart', JSON.stringify(newCart))
        return {
          ...state,
          cart: newCart,
        }
        // if there is no selected quantity
      } else {
        let newCart = []
        // find item and increment by 1
        state.cart.map((item, i) =>
          i === action.index
            ? newCart.push({ ...item, quantity: item.quantity + 1 })
            : newCart.push(item),
        )
        localStorage.setItem('cart', JSON.stringify(newCart))
        return {
          ...state,
          cart: newCart,
        }
      }
    }
  }
  if (action.type === 'DECREMENT_QUANTITY') {
    if (!state.cart) {
      return {
        ...state,
      }
    }
    if (state.cart) {
      let newCart = []
      // make sure they cannot decrease quantity lower than 1
      state.cart.map((item, i) =>
        i === action.index && item.quantity >= 2
          ? newCart.push({ ...item, quantity: item.quantity - 1 })
          : i !== action.index && newCart.push(item),
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return {
        ...state,
        cart: newCart,
      }
    }
  }

  if (action.type === 'CHANGE_SELECTION') {
    let updatedCart = []
    // loop through cart
    state.cart.forEach((item, productIndex) => {
      // find item in cart
      if (
        item.title === action.productName &&
        productIndex === action.productIndex
      ) {
        // spread previous options into new array
        let tempOptions = [...item.selectedOptions]
        // insert new item at index of prev item
        tempOptions.splice(action.index, 1, {
          name: action.title,
          selection: action.selection,
        })
        // push new selection to cart
        updatedCart.push({ ...item, selectedOptions: tempOptions })
      } else {
        updatedCart.push(item)
      }
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    return {
      ...state,
      cart: updatedCart,
    }
  }

  return state
}

export default rootReducer
