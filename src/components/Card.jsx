import { Component } from "react";
import { Link } from "react-router-dom";

import "./Card.css";
import cartIcon from "../Assets/emptyCartWhite.png";

export default class Card extends Component {
 render() {
  return (
   <Link to={`/product/${this.props.product.id}`}>
    <div className="cardBody">
     <div className="cardImage">
      {this.props.product.inStock && (
       <img src={this.props.product.gallery[0]} alt="product" />
      )}
      {!this.props.product.inStock && (
       <>
        <img
         className="stockImage"
         src={this.props.product.gallery[0]}
         alt="product"
        />
        <p className="stock">OUT OF STOCK</p>
       </>
      )}
      <button className="addToCart">
       <img src={cartIcon} alt="add to cart icon" />
      </button>
     </div>
     <div className="cardDescription">
      <p className="itemName">
       {this.props.product.brand} {this.props.product.name}
      </p>
      <span className="itemPrice">
       {this.props.product.prices[0].currency.symbol}
       {this.props.product.prices[0].amount}
      </span>
     </div>
    </div>
   </Link>
  );
 }
}
