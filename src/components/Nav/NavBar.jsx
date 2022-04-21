import { Component } from "react";
import { connect } from "react-redux";

import "./NavBar.css";
import logo from "../../Assets/logo.svg";
import cartIcon from "../../Assets/emptyCart.svg";
import chevronIcon from "../../Assets/chevron.png";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../../Hooks/useQuery";
import MiniCart from "../MiniCart/MiniCart";

class NavBar extends Component {
 state = {
  categories: null,
  showSelector: false,
  showCart: false,
  quantity: 0,
  totalPrice: 0,
 };
 render() {
  return (
   <>
    <header id="header">
     <nav>
      <ul className="nav-links">
       <li>
        <NavLink to="/">ALL</NavLink>
       </li>
       {this.state.categories &&
        this.state.categories.map(
         (cat) =>
          cat.name !== "all" && (
           <li key={cat.name}>
            <NavLink to={`/${cat.name}`}>{cat.name.toUpperCase()}</NavLink>
           </li>
          )
        )}
      </ul>
     </nav>
     <div className="logo-container">
      <img className="shop-logo" alt="Shop Logo" src={logo} />
     </div>
     <div className="nav-buttons">
      <div
       onClick={() => this.setState({ showSelector: !this.state.showSelector })}
       className="currency-container">
       <span className="currency-icon">
        {this.props.selectedCurrency.symbol}
       </span>
       <span className="chevron-container">
        {!this.state.showSelector && (
         <img
          className="chevron-icon"
          src={chevronIcon}
          alt="chevron down Icon"
         />
        )}
        {this.state.showSelector && (
         <img
          className="chevron-up-icon"
          src={chevronIcon}
          alt="chevron up Icon"
         />
        )}
       </span>
      </div>
      <div
       onClick={() => this.setState({ showCart: !this.state.showCart })}
       className="cart-icon-container">
       <img className="cart-icon" src={cartIcon} alt="shopping cart icon" />
       {this.props.cart && this.state.quantity > 0 && (
        <span className="items-in-cart">{this.state.quantity}</span>
       )}
      </div>
     </div>
    </header>
    {this.state.showSelector && (
     <CurrencySelector changeShowSelector={this.changeShowSelector} />
    )}
    {this.state.showCart && (
     <MiniCart
      quantity={this.state.quantity}
      totalPrice={this.state.totalPrice}
      changeShowCart={this.changeShowCart}
     />
    )}
   </>
  );
 }

 changeShowCart = () => {
  this.setState({ showCart: !this.state.showCart });
 };

 changeShowSelector = () => {
  this.setState({ showSelector: !this.state.showSelector });
 };

 componentDidMount() {
  const fetch = async () => {
   let res = await fetchCategories();
   this.setState({ categories: res.data.data.categories });
  };
  fetch();
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
  this.setState({ quantity: quant, totalPrice: total });
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
   this.setState({ quantity: quant, totalPrice: total });
  }
 }
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
 };
};

export default connect(mapStateToProps)(NavBar);
