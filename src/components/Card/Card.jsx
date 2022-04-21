import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Card.css";
import cartIcon from "../../Assets/emptyCartWhite.png";

class Card extends Component {
 state = {
  showOptions: false,
  itemAdded: false,
  productQuantity: 1,
 };

 render() {
  const { product } = this.props;

  return (
   <div className="card-body">
    <div className="card-image">
     {product.inStock && (
      <Link to={`/product/${product.id}`}>
       <img src={product.gallery[0]} alt="product" />
      </Link>
     )}
     {/* if product is not in stock show out of stock filter */}
     {!product.inStock && (
      <Link to={`/product/${product.id}`}>
       <img className="stock-image" src={product.gallery[0]} alt="product" />
       <p className="stock">OUT OF STOCK</p>
      </Link>
     )}
     {/* if product is in stock show cart icon */}
     {product.inStock && !this.state.showOptions && (
      <button
       onClick={() => this.setState({ showOptions: !this.state.showOptions })}
       className="add-to-cart">
       <img src={cartIcon} alt="add to cart icon" />
      </button>
     )}
     {/* show X icon when options section is open */}
     {product.inStock && this.state.showOptions && (
      <button
       onClick={() => this.setState({ showOptions: !this.state.showOptions })}
       className="add-to-cart">
       <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#FFF">
        <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
       </svg>
      </button>
     )}
     {/* if product does not have options use this button to add to cart */}
     {product.attributes.length === 0 && (
      <button onClick={() => this.addToCart()} className="add-to-cart">
       {/* show cart icon when itemAdded is false */}
       {!this.state.itemAdded && <img src={cartIcon} alt="add to cart icon" />}
       {/* show check icon after adding item to cart */}
       {this.state.itemAdded && (
        <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="#FFF">
         <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
       )}
      </button>
     )}
    </div>
    {/* show options for product when cart icon is clicked */}
    {this.state.showOptions && (
     <div className="card-options">
      {/* if state exists then loop through products */}
      {this.state &&
       product.attributes.map((attribute, idx) => (
        <div className="product-attributes" key={idx}>
         <h4>{attribute.name.toUpperCase()}:</h4>
         <ul>
          {/* loop through the products attributes */}
          {attribute.items.map((item) => (
           <li key={item.id}>
            {/* if option value does not include a hash return this */}
            {!item.value.includes("#") && (
             <span
              onClick={() =>
               this.changeSelected(attribute.name, item.value, idx)
              }
              /* if the option matches the currently selected option give it the selected class */
              className={`${
               this.state.selectedOptions[idx].name === attribute.name &&
               this.state.selectedOptions[idx].selection === item.value
                ? "selected-card-option"
                : "card-option"
              }`}>
              {item.value}
             </span>
            )}
            {/* if the option includes a hash that means it is a hex value so return a swatch */}
            {item.value.includes("#") && (
             <div
              /* if option matches selected color give active class */
              className={`${
               this.state.selectedOptions[idx].name === attribute.name &&
               this.state.selectedOptions[idx].selection === item.value
                ? "active-card-swatch-outline"
                : "card-swatch-outline"
              }`}>
              <span
               onClick={() =>
                this.changeSelected(attribute.name, item.value, idx)
               }
               className="card-swatch"
               style={{ backgroundColor: `${item.value}` }}></span>
             </div>
            )}
           </li>
          ))}
         </ul>
        </div>
       ))}
      <div className="card-quantity-container">
       <h4>QUANTITY:</h4>
       <div className="card-quantity">
        <button onClick={() => this.decrement()}>-</button>
        <p>{this.state.productQuantity}</p>
        <button onClick={() => this.increment()}>+</button>
       </div>
      </div>
      <button onClick={() => this.addToCart()} className="add-to-cart-button">
       {this.state.itemAdded ? "ADDED TO CART" : "ADD TO CART"}
      </button>
     </div>
    )}
    <div className="card-description">
     <p className="item-name">
      {product.brand} {product.name}
     </p>
     <span className="item-price">
      {product.prices.map((price) => {
       /* map through product prices array
        if the product prices label equals selected currency label
        then return the symbol and label */
       return price.currency.label === this.props.selectedCurrency.label
        ? price.currency.symbol + price.amount
        : null;
      })}
     </span>
    </div>
   </div>
  );
 }

 increment = () => {
  this.setState({ productQuantity: this.state.productQuantity + 1 });
 };

 decrement = () => {
  this.state.productQuantity >= 2 &&
   this.setState({ productQuantity: this.state.productQuantity - 1 });
 };

 changeSelected = (title, item, idx) => {
  // spread previous selected options
  let options = [...this.state.selectedOptions];
  // insert new option at index
  options.splice(idx, 1, { name: title, selection: item });
  // set current state with updated options
  this.setState({ selectedOptions: options });
 };

 componentDidMount() {
  // create empty array
  let defaultOptions = [];
  /* if the product has attributes loop through them */
  this.props.product.attributes &&
   this.props.product.attributes.map((attribute) =>
    // add the first attribute and title of attribute to new array
    defaultOptions.push({
     name: attribute.name,
     selection: attribute.items[0].value,
    })
   );
  // set state to default product options
  this.setState({ selectedOptions: defaultOptions });
 }

 componentDidUpdate(prevProps) {
  // if props did not change do not update
  if (this.props.product !== prevProps.product) {
   this.setState({ itemAdded: false });
   let defaultOptions = [];

   this.props.product.attributes &&
    this.props.product.attributes.map((attribute) =>
     defaultOptions.push({
      name: attribute.name,
      selection: attribute.items[0].value,
     })
    );
   this.setState({ selectedOptions: defaultOptions });
  }
 }

 addToCart = () => {
  // create bool to see if cart contains item already
  let contains;
  let productIndex;
  // show added to cart on button
  this.setState({ itemAdded: true });
  // after 300 ms seconds change text back to add to cart
  setTimeout(() => {
   this.setState({ itemAdded: false });
  }, 300);
  // create object to hold the item you are adding to cart
  let prod = {
   id: this.props.product.id,
   brand: this.props.product.brand,
   title: this.props.product.name,
   thumb: this.props.product.gallery[0],
   prices: this.props.product.prices,
   attributes: this.props.product.attributes,
   selectedOptions: this.state.selectedOptions,
   gallery: this.props.product.gallery,
   quantity: this.state.productQuantity,
  };
  // if there are items in the cart
  if (this.props.cart.length > 0) {
   // if the item you are adding does not have any options
   if (prod.selectedOptions.length === 0) {
    for (let i = 0; i < this.props.cart.length; i++) {
     // if item you are adding is already in the cart
     // set the contains bool to true and grab the index of that item
     if (
      this.props.cart[i].title === prod.title &&
      this.props.cart[i].brand === prod.brand
     ) {
      contains = true;
      productIndex = i;
      break;
     } else {
      contains = false;
     }
    }
    // if item is in cart add 1 to the quantity
    if (contains === true) {
     this.props.increment(productIndex);
     // if item is not in the cart add it to the cart
    } else {
     this.props.addToCart(prod);
    }
    return;
   } else {
    // if item has options loop through the cart
    for (let i = 0; i < this.props.cart.length; i++) {
     if (
      // if all the selected options match an item in the cart
      // then set contains bool to true and grab the index
      this.props.cart[i].selectedOptions.every(
       (option, idx) => option.selection === prod.selectedOptions[idx].selection
      ) &&
      this.props.cart[i].selectedOptions.length > 0
     ) {
      contains = true;
      productIndex = i;
      break;
     } else {
      contains = false;
     }
    }
    // if the item is already in the cart then increment by the selected quantity
    if (contains === true) {
     this.props.increment(productIndex, this.state.productQuantity);
     // if item with selected options is not in cart then add it
    } else if (contains === false) {
     this.props.addToCart(prod);
    }
   }
  } else {
   // if there is nothing in the cart just add the item
   this.props.addToCart(prod);
  }
 };
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
 };
};

const mapDispatchToProps = (dispatch) => {
 return {
  addToCart: (product) => {
   dispatch({
    type: "ADD_PRODUCT",
    product: product,
   });
  },
  increment: (idx, quantity) => {
   dispatch({
    type: "INCREMENT_QUANTITY",
    index: idx,
    amount: quantity,
   });
  },
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
