import { Component } from "react";
import { connect } from "react-redux";
import MiniCartProduct from "../MiniCartProduct/MiniCartProduct";

import "./MiniCart.css";

class MiniCart extends Component {
 state = {
  quantity: 2,
 };

 render() {
  return (
   <div onClick={() => this.props.changeShowCart()} className="cartWrapper">
    <div className="cartContainer">
     <h2>
      My Bag<span>, {this.props.quantity} items</span>
     </h2>
     {this.props.cart &&
      this.props.cart.map((product, idx) => (
       <MiniCartProduct
        key={idx}
        quantity={this.props.quantity}
        product={product}
        currency={this.props.selectedCurrency}
       />
      ))}
     {!this.props.cart && <div className="noProducts">No Products Yet...</div>}

     <div className="totalContainer">
      <h2>Total</h2>
      <p>$100.00</p>
     </div>
     <div className="miniCartActions">
      <button className="outlinedButton">VIEW BAG</button>
      <button className="addToCartButton">CHECK OUT</button>
     </div>
    </div>
   </div>
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
