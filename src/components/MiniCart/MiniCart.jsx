import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MiniCartProduct from "../MiniCartProduct/MiniCartProduct";

import "./MiniCart.css";

class MiniCart extends Component {
 state = {
  quantity: 2,
 };

 render() {
  return (
   <>
    <div className="mini-cart-container">
     <h2>
      My Bag<span>, {this.props.quantity} items</span>
     </h2>
     {this.props.cart &&
      this.props.cart.map((product, idx) => (
       <MiniCartProduct
        key={idx}
        index={idx}
        quantity={this.props.quantity}
        product={product}
        currency={this.props.selectedCurrency}
       />
      ))}
     {this.props.quantity < 1 && (
      <div className="no-products">No Products Yet...</div>
     )}

     <div className="total-container">
      <h2>Total</h2>
      <p>
       {this.props.selectedCurrency.symbol}
       {this.props.totalPrice.toFixed(2)}
      </p>
     </div>
     <div className="mini-cart-actions">
      <Link to="/cart">
       <button className="outlined-button">VIEW BAG</button>
      </Link>
      <Link to="/checkout">
       <button className="add-to-cart-button">CHECK OUT</button>
      </Link>
     </div>
    </div>
    <div
     onClick={() => this.props.changeShowCart()}
     className="cart-wrapper"></div>
   </>
  );
 }
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
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
