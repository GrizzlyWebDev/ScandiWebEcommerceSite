import axios from 'axios'

export const fetchCategories = async () => {
  const query = `query {
    categories {
      name
    }
  }
  `
  try {
    let res = await axios({
      method: 'post',
      url: 'http://localhost:4000',
      data: { query },
    })
    return res
  } catch (err) {
    return err
  }
}

export const fetchCurrencyList = async () => {
  const query = `query {
    currencies {
      label
      symbol
    }
  }
  `
  try {
    let res = await axios({
      method: 'post',
      url: 'http://localhost:4000',
      data: { query },
    })
    return res
  } catch (err) {
    return err
  }
}

export const fetchProducts = async (category) => {
  const query = `query($categoryName: CategoryInput) {
  category(input: $categoryName) {
    products {
      id
  name
  inStock
  gallery
  description
  category
  attributes {
    id
    name
    type
    items {
      displayValue
      value
      id
    }
  }
  prices {
    currency {
      label
      symbol
    }
    amount
  }
  brand
    }
  }
}
`
  const variables = {
    categoryName: {
      // check if route has params, if not category equals all
      title: category ? category : 'all',
    },
  }
  try {
    let res = await axios({
      method: 'post',
      url: 'http://localhost:4000',
      data: { query, variables },
    })
    return res
  } catch (err) {
    return err
  }
}

export const fetchProduct = async (id) => {
  const query = `query($id: String!) {
        product(id: $id) {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
        `
  const variables = {
    id: id,
  }
  try {
    let res = await axios({
      method: 'post',
      url: 'http://localhost:4000',
      data: { query, variables },
    })
    return res
  } catch (err) {
    return err
  }
}
