import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./MiniCartProduct.css";

class MiniCartProduct extends Component {
 render() {
  return (
   <div className="miniProductContainer">
    <div className="miniDescription">
     <p>{this.props.product.brand}</p>
     <p>{this.props.product.title}</p>
     <p className="price">
      {this.props.product.prices.map((price) => {
       return price.currency.label === this.props.currency.label
        ? price.currency.symbol + price.amount
        : null;
      })}
     </p>
     {this.props.product.selectedOptions.map((option) => (
      <div className="miniProductOption" key={option.name}>
       <h4>{option.name}:</h4>
       {!option.selection.includes("#") ? (
        <span>{option.selection}</span>
       ) : (
        <span
         className="swatch"
         style={{ backgroundColor: `${option.selection}` }}></span>
       )}
      </div>
     ))}
    </div>
    <div className="miniQuantityContainer">
     <button onClick={() => this.props.increment(this.props.index)}>+</button>
     <p>{this.props.product.quantity}</p>
     <button onClick={() => this.props.decrement(this.props.index)}>-</button>
    </div>
    <div className="miniProductImage">
     <Link
      onClick={() => this.props.changeShowCart()}
      to={`/product/${this.props.product.id}`}>
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
