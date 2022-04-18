const localState = {
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
    if (state.cart.length > 0) {
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.cart, action.product]),
      )
      return {
        ...state,
        cart: [...state.cart, action.product],
      }
    } else {
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
      let newCart = []
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
  if (action.type === 'DECREMENT_QUANTITY') {
    if (!state.cart) {
      return {
        ...state,
      }
    }
    if (state.cart) {
      let newCart = []

      state.cart.map((item, i) =>
        i === action.index && item.quantity >= 2
          ? newCart.push({ ...item, quantity: item.quantity - 1 })
          : i !== action.index && newCart.push(item),
      )

      if (newCart) {
        localStorage.setItem('cart', JSON.stringify(newCart))
        return {
          ...state,
          cart: newCart,
        }
      } else {
        localStorage.setItem('cart', [])
        return {
          ...state,
        }
      }
    }
  }

  if (action.type === 'CHANGE_SELECTION') {
    let updatedCart = []
    state.cart.forEach((item, productIndex) => {
      if (
        item.title === action.productName &&
        productIndex === action.productIndex
      ) {
        let tempOptions = [...item.selectedOptions]
        tempOptions.splice(action.index, 1, {
          name: action.title,
          selection: action.selection,
        })
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
