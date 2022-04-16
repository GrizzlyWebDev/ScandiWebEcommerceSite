import { Component } from "react";
import { connect } from "react-redux";
import CartProducts from "../CartProducts/CartProducts";

import "./Cart.css";

class Cart extends Component {
 render() {
  return (
   <main>
    <div className="cartTitleSection">
     <h1>CART</h1>
    </div>
    <div className="cartContainer">
     {this.props.cart &&
      this.props.cart.map((product, idx) => (
       <CartProducts
        key={idx}
        index={idx}
        quantity={this.props.quantity}
        product={product}
        currency={this.props.selectedCurrency}
       />
      ))}
     {this.props.cart.length < 1 && (
      <div>
       <h2>No Products Yet...</h2>
      </div>
     )}
    </div>
   </main>
  );
 }
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
 };
};

export default connect(mapStateToProps)(Cart);
