import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./CartProducts.css";

class CartProduct extends Component {
 state = { galleryIndex: 0 };
 render() {
  return (
   <div className="product-container">
    <div className="cart-product-description">
     <h2>{this.props.product.brand}</h2>
     <h4>{this.props.product.title}</h4>
     <p className="price">
      {/* map through prices array in product
       if the currency matches the selected currency
       display that item */}
      {this.props.product.prices.map((price) => {
       return price.currency.label === this.props.currency.label
        ? price.currency.symbol +
           (price.amount * this.props.product.quantity).toFixed(2)
        : null;
      })}
     </p>
     {this.props.product.attributes.map((attribute, idx) => (
      <div className="product-attributes" key={idx}>
       <p key={attribute.id}>{attribute.name.toUpperCase()}:</p>
       <ul key={idx}>
        {/* loop through product attributes and display 
         options for each attribute depending on if they
         are an option or a swatch */}
        {attribute.items.map((item) => (
         <li key={item.id}>
          {!item.value.includes("#") && (
           <button
            onClick={() =>
             this.props.changeSelection(
              idx,
              this.props.index,
              attribute.name,
              item.value,
              this.props.product.title
             )
            }
            className={`${
             this.props.product.selectedOptions[idx].name === attribute.name &&
             this.props.product.selectedOptions[idx].selection === item.value
              ? "selected"
              : ""
            }`}>
            {item.displayValue}
           </button>
          )}
          {item.value.includes("#") && (
           <div
            className={`${
             this.props.product.selectedOptions[idx].name === attribute.name &&
             this.props.product.selectedOptions[idx].selection === item.value
              ? "active-swatch-outline"
              : "swatch-outline"
            }`}>
            <span
             onClick={() =>
              this.props.changeSelection(
               idx,
               this.props.index,
               attribute.name,
               item.value,
               this.props.product.title
              )
             }
             className="swatch"
             style={{ backgroundColor: `${item.value}` }}></span>
           </div>
          )}
         </li>
        ))}
       </ul>
      </div>
     ))}
    </div>
    <div className="product-display-container">
     <div className="quantity-container">
      <button onClick={() => this.props.increment(this.props.index)}>+</button>
      <p>{this.props.product.quantity}</p>
      <button onClick={() => this.props.decrement(this.props.index)}>-</button>
     </div>
     <div className="product-image">
      {this.props.product.gallery.length > 1 && (
       <div className="slide-container">
        {/* decrease index value of gallery if not equal to 0 */}
        <button
         onClick={() =>
          this.state.galleryIndex > 0 &&
          this.setState({ galleryIndex: this.state.galleryIndex - 1 })
         }
         className="slide-button-left">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16">
          <path
           fillRule="evenodd"
           d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
         </svg>
        </button>

        <button
         /* increase index of gallery to cycle through product photos */
         onClick={() =>
          this.state.galleryIndex < this.props.product.gallery.length - 1 &&
          this.setState({ galleryIndex: this.state.galleryIndex + 1 })
         }
         className="slide-button-right">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16">
          <path
           fillRule="evenodd"
           d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
         </svg>
        </button>
       </div>
      )}
      <Link
       /* if you click on the image you can view the product page */
       onClick={() => this.props.changeShowCart()}
       to={`/product/${this.props.product.id}`}>
       <img
        src={this.props.product.gallery[this.state.galleryIndex]}
        alt="product"
       />
      </Link>
     </div>
    </div>
   </div>
  );
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
  increment: (idx) => {
   dispatch({
    type: "INCREMENT_QUANTITY",
    index: idx,
   });
  },
  decrement: (idx) => {
   dispatch({
    type: "DECREMENT_QUANTITY",
    index: idx,
   });
  },
  changeSelection: (idx, productIndex, title, item, productName) => {
   dispatch({
    type: "CHANGE_SELECTION",
    index: idx,
    productIndex: productIndex,
    title: title,
    selection: item,
    productName: productName,
   });
  },
 };
};

export default connect(null, mapDispatchToProps)(CartProduct);
