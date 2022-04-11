import { Component } from "react";
import { Link } from "react-router-dom";

import "./Card.css";
import cartIcon from "../../Assets/emptyCartWhite.png";

export default class Card extends Component {
 render() {
  const { product } = this.props;

  return (
   <Link to={`/product/${product.id}`}>
    <div className="cardBody">
     <div className="cardImage">
      {product.inStock && <img src={product.gallery[0]} alt="product" />}
      {!product.inStock && (
       <>
        <img className="stockImage" src={product.gallery[0]} alt="product" />
        <p className="stock">OUT OF STOCK</p>
       </>
      )}
      <button className="addToCart">
       <img src={cartIcon} alt="add to cart icon" />
      </button>
     </div>
     <div className="cardDescription">
      <p className="itemName">
       {product.brand} {product.name}
      </p>
      <span className="itemPrice">
       {product.prices[0].currency.symbol}
       {product.prices[0].amount}
      </span>
     </div>
    </div>
   </Link>
  );
 }
}
