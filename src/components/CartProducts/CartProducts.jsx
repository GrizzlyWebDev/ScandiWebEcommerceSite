import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./CartProducts.css";

class CartProduct extends Component {
 render() {
  return (
   <div className="productContainer">
    <div className="cartProductdescription">
     <h2>{this.props.product.brand}</h2>
     <h4>{this.props.product.title}</h4>
     <p className="price">
      {this.props.product.prices.map((price) => {
       return price.currency.label === this.props.currency.label
        ? price.currency.symbol + (price.amount * this.props.product.quantity).toFixed(2)
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
             this.changeSelected(attribute.name, item.value, idx)
            }>
            {item.displayValue}
           </button>
          )}
          {item.value.includes("#") && (
           <span
            onClick={() => this.changeSelected(attribute.name, item.value, idx)}
            className="swatch"
            style={{ backgroundColor: `${item.value}` }}>
            null
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
      <Link
       onClick={() => this.props.changeShowCart()}
       to={`/product/${this.props.product.id}`}>
       <img src={this.props.product.thumb} alt="product" />
      </Link>
     </div>
    </div>
   </div>
  );
 }
 changeSelected = (title, item, idx) => {
  let options = [...this.state.selectedOptions];
  options.splice(idx, 1, { name: title, selection: item });
  this.setState({ selectedOptions: options });
 };
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
 };
};

export default connect(null, mapDispatchToProps)(CartProduct);
