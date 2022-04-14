import { Component } from "react";

import "./MiniCartProduct.css";

export default class MiniCartProduct extends Component {
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
       <p>{option.name}</p>
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
     <button>+</button>
     <p>{this.props.product.quantity}</p>
     <button>-</button>
    </div>
    <div className="miniProductImage">
     <img src={this.props.product.thumb} alt="product" />
    </div>
   </div>
  );
 }
}
