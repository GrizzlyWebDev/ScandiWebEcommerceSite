import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Card.css";
import cartIcon from "../../Assets/emptyCartWhite.png";

class Card extends Component {
 state = {
  showOptions: false,
  itemAdded: false,
 };

 render() {
  const { product } = this.props;

  return (
   <div className="cardBody">
    <div className="cardImage">
     {product.inStock && (
      <Link to={`/product/${product.id}`}>
       <img src={product.gallery[0]} alt="product" />
      </Link>
     )}
     {!product.inStock && (
      <Link to={`/product/${product.id}`}>
       <img className="stockImage" src={product.gallery[0]} alt="product" />
       <p className="stock">OUT OF STOCK</p>
      </Link>
     )}
     {product.inStock && !this.state.showOptions && (
      <button
       onClick={() => this.setState({ showOptions: !this.state.showOptions })}
       className="addToCart">
       <img src={cartIcon} alt="add to cart icon" />
      </button>
     )}
     {product.inStock && this.state.showOptions && (
      <button
       onClick={() => this.setState({ showOptions: !this.state.showOptions })}
       className="addToCart">
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
     {!product.inStock ||
      (product.attributes.length === 0 && (
       <button onClick={() => this.addToCart()} className="addToCart">
        {!this.state.itemAdded && <img src={cartIcon} alt="add to cart icon" />}
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
      ))}
    </div>
    {this.state.showOptions && (
     <div className="cardOptions">
      {this.state &&
       product.attributes.map((attribute, idx) => (
        <div className="productAttributes" key={idx}>
         <p key={attribute.id}>{attribute.name.toUpperCase()}:</p>
         <ul key={idx}>
          {attribute.items.map((item) => (
           <li key={item.id}>
            {!item.value.includes("#") && (
             <span
              onClick={() =>
               this.changeSelected(attribute.name, item.value, idx)
              }
              className={`${
               this.state.selectedOptions[idx].name === attribute.name &&
               this.state.selectedOptions[idx].selection === item.value
                ? "selected"
                : ""
              }`}>
              {item.value}
             </span>
            )}
            {item.value.includes("#") && (
             <span
              onClick={() =>
               this.changeSelected(attribute.name, item.value, idx)
              }
              className="swatch"
              style={{ backgroundColor: `${item.value}` }}>
              {this.state.selectedOptions[idx].name === attribute.name &&
              this.state.selectedOptions[idx].selection === item.value ? (
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="#FFF"
                stroke="#1D1F22">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
               </svg>
              ) : null}
             </span>
            )}
           </li>
          ))}
         </ul>
        </div>
       ))}
      <button onClick={() => this.addToCart()} className="addToCartButton">
       {this.state.itemAdded ? "ADDED TO CART" : "ADD TO CART"}
      </button>
     </div>
    )}
    <div className="cardDescription">
     <p className="itemName">
      {product.brand} {product.name}
     </p>
     <span className="itemPrice">
      {product.prices.map((price) => {
       // map through product prices array
       // if the product prices label equals selected currency label
       // then return the symbol and label
       return price.currency.label === this.props.selectedCurrency.label
        ? price.currency.symbol + price.amount
        : null;
      })}
     </span>
    </div>
   </div>
  );
 }

 changeSelected = (title, item, idx) => {
  let options = [...this.state.selectedOptions];
  options.splice(idx, 1, { name: title, selection: item });
  this.setState({ selectedOptions: options });
 };

 componentDidMount() {
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

 componentDidUpdate(prevProps) {
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
  let contains;
  let productIndex;
  this.setState({ itemAdded: true });
  setTimeout(() => {
   this.setState({ itemAdded: false });
  }, 300);
  let prod = {
   id: this.props.product.id,
   brand: this.props.product.brand,
   title: this.props.product.name,
   thumb: this.props.product.gallery[0],
   prices: this.props.product.prices,
   attributes: this.props.product.attributes,
   selectedOptions: this.state.selectedOptions,
   gallery: this.props.product.gallery,
   quantity: 1,
  };

  if (this.props.cart.length > 0) {
   if (prod.selectedOptions.length === 0) {
    for (let i = 0; i < this.props.cart.length; i++) {
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
    if (contains === true) {
     this.props.increment(productIndex);
    } else {
     this.props.addToCart(prod);
    }
    return;
   } else {
    for (let i = 0; i < this.props.cart.length; i++) {
     if (
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
    if (contains === true) {
     this.props.increment(productIndex);
    } else if (contains === false) {
     this.props.addToCart(prod);
    }
   }
  } else {
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
  increment: (idx) => {
   dispatch({
    type: "INCREMENT_QUANTITY",
    index: idx,
   });
  },
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
