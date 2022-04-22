import { Component } from "react";
import { connect } from "react-redux";

import "./NavBar.css";
import logo from "../../Assets/logo.svg";
import cartIcon from "../../Assets/emptyCart.svg";
import chevronIcon from "../../Assets/chevron.png";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../../HelperFunctions/queries";
import { getTotal } from "../../HelperFunctions/useHelperFunctions";
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
       {/* category all acts as the home page
        all is active when on the home route */}
       <li>
        <NavLink to="/">ALL</NavLink>
       </li>
       {/* if the category is not all map through and create
       links for each category */}
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
        {/* if currency container is open show chevron up
         otherwise show chevron down */}
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
       {/* if items are in the cart and the quantity is more than one
       then show the cart quantity badge */}
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
  // fetch the category list from server
  fetch();
  // put cart and seclected currency into get total function
  let result = getTotal(this.props.cart, this.props.selectedCurrency);
  let total = result.total;
  let quant = result.quantity;
  this.setState({ quantity: quant, totalPrice: total });
 }

 componentDidUpdate(prevProps) {
  if (this.props !== prevProps) {
   // put cart and seclected currency into get total function
   let result = getTotal(this.props.cart, this.props.selectedCurrency);
   let total = result.total;
   let quant = result.quantity;
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
