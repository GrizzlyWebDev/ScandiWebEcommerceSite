import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./CartProducts.css";

class CartProduct extends Component {
 state = { galleryIndex: 0 };
 render() {
  return (
   <div className="productContainer">
    <div className="cartProductdescription">
     <h2>{this.props.product.brand}</h2>
     <h4>{this.props.product.title}</h4>
     <p className="price">
      {this.props.product.prices.map((price) => {
       return price.currency.label === this.props.currency.label
        ? price.currency.symbol +
           (price.amount * this.props.product.quantity).toFixed(2)
        : null;
      })}
     </p>
     {this.props.product.attributes.map((attribute, idx) => (
      <div className="productAttributes" key={idx}>
       <p key={attribute.id}>{attribute.name.toUpperCase()}:</p>
       <ul key={idx}>
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
            style={{ backgroundColor: `${item.value}` }}>
            {this.props.product.selectedOptions[idx].name === attribute.name &&
            this.props.product.selectedOptions[idx].selection === item.value ? (
             <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
    </div>
    <div className="productDisplayContainer">
     <div className="quantityContainer">
      <button onClick={() => this.props.increment(this.props.index)}>+</button>
      <p>{this.props.product.quantity}</p>
      <button onClick={() => this.props.decrement(this.props.index)}>-</button>
     </div>
     <div className="productImage">
      {this.props.product.gallery.length > 1 && (
       <div className="slideContainer">
        <button
         onClick={() =>
          this.state.galleryIndex > 0 &&
          this.setState({ galleryIndex: this.state.galleryIndex - 1 })
         }
         className="slideButtonLeft">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 16 16">
          <path
           fillRule="evenodd"
           d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
         </svg>
        </button>

        <button
         onClick={() =>
          this.state.galleryIndex < this.props.product.gallery.length - 1 &&
          this.setState({ galleryIndex: this.state.galleryIndex + 1 })
         }
         className="slideButtonRight">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
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
