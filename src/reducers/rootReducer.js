const initState = {
  selectedCurrency: {
    label: 'USD',
    symbol: '$',
  },
}

const localState = {
  selectedCurrency: JSON.parse(localStorage.getItem('selectedCurrency')),
}

const rootReducer = (
  state = localStorage.length > 0 ? localState : initState,
  action,
) => {
  if (action.type === 'CHANGE_CURRENCY') {
    return {
      ...state,
      selectedCurrency: {
        label: action.currency.label,
        symbol: action.currency.symbol,
      },
    }
  }
  if (action.type === 'ADD_PRODUCT') {
    if (state.cart) {
      return {
        ...state,
        cart: [...state.cart, action.product],
      }
    } else {
      return {
        ...state,
        cart: [action.product],
      }
    }
  }
  return state
}

export default rootReducer
