export const getTotal = (cart, selectedCurrency) => {
  let quant = 0
  let total = 0
  // if cart has items loop through and add
  // the item quantity  then multiply the quantity by the
  // price of each item
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

export const checkCart = (cart, product, selectedOptions, quantity) => {
  // create object to hold the item you are adding to cart
  let contains
  let productIndex
  let prod = {
    id: product.id,
    brand: product.brand,
    title: product.name,
    thumb: product.gallery[0],
    prices: product.prices,
    attributes: product.attributes,
    selectedOptions: selectedOptions,
    gallery: product.gallery,
    quantity: quantity,
  }
  // if there are items in the cart
  if (cart.length > 0) {
    // if the item you are adding does not have any options
    if (prod.selectedOptions.length === 0) {
      // if item you are adding is already in the cart
      // set the contains bool to true and grab the index of that item
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === prod.title && cart[i].brand === prod.brand) {
          contains = true
          productIndex = i
          break
        } else {
          contains = false
        }
      }
    } else {
      // if item has options loop through the cart
      for (let i = 0; i < cart.length; i++) {
        if (
          // if all the selected options match an item in the cart
          // then set contains bool to true and grab the index
          cart[i].selectedOptions.every(
            (option, idx) =>
              option.selection === prod.selectedOptions[idx].selection,
          ) &&
          cart[i].selectedOptions.length > 0
        ) {
          contains = true
          productIndex = i
          break
        } else {
          contains = false
        }
      }
    }
  }
  return { contains: contains, productIndex: productIndex, prod: prod }
}
