import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Card.css";
import cartIcon from "../../Assets/emptyCartWhite.png";

class Card extends Component {
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
   </Link>
  );
 }
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
 };
};

export default connect(mapStateToProps)(Card);
