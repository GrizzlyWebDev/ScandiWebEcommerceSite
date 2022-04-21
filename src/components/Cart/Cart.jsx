import { Component } from "react";
import { connect } from "react-redux";
import CartProducts from "../CartProducts/CartProducts";

import "./Cart.css";

class Cart extends Component {
 state = {
  cartTotal: 0,
 };
 render() {
  return (
   <main>
    <div className="cart-title-section">
     <h1>CART</h1>
     <h2>
      Total: {this.props.selectedCurrency.symbol}
      {this.state.cartTotal.toFixed(2)}
     </h2>
    </div>
    <div className="cart-container">
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

export default connect(mapStateToProps)(Cart);
