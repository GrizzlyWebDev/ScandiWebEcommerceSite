import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTotal } from "../../Hooks/useHelperFunctions";
import MiniCartProduct from "../MiniCartProduct/MiniCartProduct";

import "./Checkout.css";

class Checkout extends Component {
 state = {
  cartTotal: 0,
 };
 render() {
  return (
   <main className="checkout-container">
    <div className="cart-section">
     <div className="checkout-title-section">
      <h1>CHECKOUT</h1>
      <h2>
       Total: {this.props.selectedCurrency.symbol}
       {this.state.cartTotal.toFixed(2)}
      </h2>
     </div>
     <div className="checkout-cart-container">
      {this.props.cart &&
       this.props.cart.map((product, idx) => (
        <div key={idx} className="product-details">
         <MiniCartProduct
          index={idx}
          quantity={this.props.quantity}
          product={product}
          currency={this.props.selectedCurrency}
          changeShowCart={this.props.changeShowCart}
         />
        </div>
       ))}
      {this.props.cart.length < 1 && (
       <div>
        <h2>No Products Yet...</h2>
       </div>
      )}
     </div>
    </div>
    <div className="checkout-section">
     <div className="personal-info">
      <h1>Shipping Info</h1>
      <form>
       <input
        type="text"
        id="firstName"
        placeholder="First Name"
        autoComplete="given-name"
       />
       <input
        type="text"
        id="lastName"
        placeholder="Last Name"
        autoComplete="family-name"
       />
       <input
        type="email"
        id="email"
        placeholder="Email Address"
        autoComplete="email"
       />
       <input
        type="text"
        id="address"
        placeholder="Street Address"
        autoComplete="street-address"
       />
       <input
        type="text"
        id="city"
        placeholder="City"
        autoComplete="address-level2"
       />
       <input
        type="text"
        id="state"
        placeholder="State"
        autoComplete="address-level1"
       />
       <input
        type="text"
        id="zip"
        placeholder="Postal Code"
        autoComplete="postal-code"
       />
       <input
        type="text"
        id="country"
        placeholder="Country"
        autoComplete="country-name"
       />
      </form>
     </div>
     <div className="payment-info">
      <h1>Payment Info</h1>
      <form>
       <input
        type="text"
        id="cardName"
        placeholder="Name On Card"
        autoComplete="cc-name"
       />
       <input
        type="number"
        id="cardNumber"
        placeholder="Card Number"
        autoComplete="cc-number"
       />
       <input
        type="month"
        id="cardExpire"
        placeholder="Expiration Date"
        autoComplete="cc-exp"
       />
       <input type="number" id="CCV" placeholder="CCV" autoComplete="cc-csc" />
      </form>
      <div className="checkout-actions">
       <Link to="/">
        <button className="outlined-button">CONTINUE SHOPPING</button>
       </Link>
       <Link to="/">
        <button className="checkout-button">PLACE ORDER</button>
       </Link>
      </div>
     </div>
    </div>
   </main>
  );
 }

 componentDidMount() {
  let result = getTotal(this.props.cart, this.props.selectedCurrency);
  let total = result.total;
  this.setState({ cartTotal: total });
 }

 componentDidUpdate(prevProps) {
  if (this.props !== prevProps) {
   let result = getTotal(this.props.cart, this.props.selectedCurrency);
   let total = result.total;
   this.setState({ cartTotal: total });
  }
 }
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
 };
};

export default connect(mapStateToProps)(Checkout);
