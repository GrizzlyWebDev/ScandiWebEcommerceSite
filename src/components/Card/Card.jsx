import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Card.css";
import cartIcon from "../../Assets/emptyCartWhite.png";
import AttributeButtons from "../AttributeButtons/AttributeButtons";
import { checkCart } from "../../HelperFunctions/useHelperFunctions";

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
    {/* show options for product when cart icon is clicked */}
    {this.state.showOptions && (
     <div>
      {/* if state exists then loop through products */}
      {this.state && (
       <AttributeButtons
        parent="card"
        product={product}
        changeSelectedDefault={this.changeSelectedDefault}
        selectedOptions={this.state.selectedOptions}
       />
      )}
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

 changeSelectedDefault = (title, item, idx) => {
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
  // change add to cart button text for 300 milliseconds for user feedback
  this.setState({ itemAdded: true });
  setTimeout(() => {
   this.setState({ itemAdded: false });
  }, 300);
  // create object to hold the item you are adding to cart
  let response = checkCart(
   this.props.cart,
   this.props.product,
   this.state.selectedOptions,
   this.state.productQuantity
  );
  let contains = response.contains;
  let productIndex = response.productIndex;
  let prod = response.prod;
  // if there are items in the cart
  if (this.props.cart.length > 0) {
   // if item is in cart increment by selected quantity
   contains === true &&
    this.props.increment(productIndex, this.state.productQuantity);
   // if item is not in the cart add it to the cart
   contains === false && this.props.addToCart(prod);
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
