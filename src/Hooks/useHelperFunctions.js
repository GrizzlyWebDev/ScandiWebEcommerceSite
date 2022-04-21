export const getTotal = (cart, selectedCurrency) => {
  let quant = 0
  let total = 0
  cart && cart.map((item) => (quant = item.quantity + quant))
  cart &&
    cart.map((item) =>
      item.prices.map((price) =>
        selectedCurrency.label === price.currency.label
          ? (total = price.amount * item.quantity + total)
          : null,
      ),
    )
  return { total: total, quantity: quant }
}
