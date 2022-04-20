import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MiniCartProduct from "../MiniCartProduct/MiniCartProduct";

import "./Checkout.css";

class Checkout extends Component {
 state = {
  cartTotal: 0,
 };
 render() {
  return (
   <main className="checkoutContainer">
    <div className="cartSection">
     <div className="checkoutTitleSection">
      <h1>CHECKOUT</h1>
      <h2>
       Total: {this.props.selectedCurrency.symbol}
       {this.state.cartTotal.toFixed(2)}
      </h2>
     </div>
     <div className="checkoutCartContainer">
      {this.props.cart &&
       this.props.cart.map((product, idx) => (
        <div key={idx} className="productDetails">
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
    <div className="checkoutSection">
     <div className="personalInfo">
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
     <div className="paymentInfo">
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
      <div className="checkoutActions">
       <Link to="/">
        <button className="outlinedButton">CONTINUE SHOPPING</button>
       </Link>
       <Link to="/">
        <button className="checkoutButton">PLACE ORDER</button>
       </Link>
      </div>
     </div>
    </div>
   </main>
  );
 }

 componentDidMount() {
  let quant = 0;
  let total = 0;
  this.props.cart &&
   this.props.cart.map((item) => (quant = item.quantity + quant));
  this.props.cart &&
   this.props.cart.map((item) =>
    item.prices.map((price) =>
     this.props.selectedCurrency.label === price.currency.label
      ? (total = price.amount * item.quantity + total)
      : null
    )
   );
  this.setState({ cartTotal: total });
 }

 componentDidUpdate(prevProps) {
  if (this.props !== prevProps) {
   let quant = 0;
   let total = 0;
   this.props.cart &&
    this.props.cart.map((item) => (quant = item.quantity + quant));
   this.props.cart &&
    this.props.cart.map((item) =>
     item.prices.map((price) =>
      this.props.selectedCurrency.label === price.currency.label
       ? (total = price.amount * item.quantity + total)
       : null
     )
    );
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
