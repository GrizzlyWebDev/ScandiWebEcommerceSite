import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AttributeButtons from "../AttributeButtons/AttributeButtons";

import "./MiniCartProduct.css";

class MiniCartProduct extends Component {
 render() {
  return (
   <div className="mini-product-container">
    <div className="mini-description">
     <p>{this.props.product.brand}</p>
     <p>{this.props.product.title}</p>
     <p className="price">
      {this.props.product.prices.map((price) => {
       return price.currency.label === this.props.currency.label
        ? price.currency.symbol +
           (price.amount * this.props.product.quantity).toFixed(2)
        : null;
      })}
     </p>
     <AttributeButtons parent={"mini"} product={this.props.product} />
    </div>
    <div className="mini-quantity-container">
     <button onClick={() => this.props.increment(this.props.index)}>+</button>
     <p>{this.props.product.quantity}</p>
     <button onClick={() => this.props.decrement(this.props.index)}>-</button>
    </div>
    <div className="mini-product-image">
     <Link to={`/product/${this.props.product.id}`}>
      <img src={this.props.product.thumb} alt="product" />
     </Link>
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
 };
};

export default connect(null, mapDispatchToProps)(MiniCartProduct);
