import { Component } from "react";
import { connect } from "react-redux";

import "./NavBar.css";
import logo from "../../Assets/logo.svg";
import cartIcon from "../../Assets/emptyCart.svg";
import chevronIcon from "../../Assets/chevron.png";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../../Hooks/useQuery";
import MiniCart from "../../MiniCart/MiniCart";

class NavBar extends Component {
 state = {
  categories: null,
  showSelector: false,
  showCart: false,
  quantity: 0,
 };
 render() {
  return (
   <>
    <header id="header">
     <nav>
      <ul className="navLinks">
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
     <div className="logoContainer">
      <img className="shopLogo" alt="Shop Logo" src={logo} />
     </div>
     <div className="navButtons">
      <div
       onClick={() => this.setState({ showSelector: !this.state.showSelector })}
       className="currencyContainer">
       <span className="currencyIcon">
        {this.props.selectedCurrency.symbol}
       </span>
       <span className="chevronContainer">
        {!this.state.showSelector && (
         <img
          className="chevronIcon"
          src={chevronIcon}
          alt="chevron down Icon"
         />
        )}
        {this.state.showSelector && (
         <img
          className="chevronUpIcon"
          src={chevronIcon}
          alt="chevron up Icon"
         />
        )}
       </span>
       {this.state.showSelector && (
        <CurrencySelector showSelector={this.state.showSelector} />
       )}
      </div>
      <div
       onClick={() => this.setState({ showCart: !this.state.showCart })}
       className="cartIconContainer">
       <img className="cartIcon" src={cartIcon} alt="shopping cart icon" />
       {this.props.cart && (
        <span className="itemsInCart">{this.state.quantity}</span>
       )}
      </div>
     </div>
    </header>
    {this.state.showCart && (
     <MiniCart
      quantity={this.state.quantity}
      changeShowCart={this.changeShowCart}
     />
    )}
   </>
  );
 }

 handleOutsideClick = (e) => {
  if (
   e.target.className !== "chevronContainer" &&
   e.target.className !== "chevronIcon" &&
   e.target.className !== "currencyIcon" &&
   e.target.className !== "currency" &&
   e.target.className !== "currencyContainer"
  ) {
   this.setState({ showSelector: false });
  }
 };

 changeShowCart = () => {
  this.setState({ showCart: !this.state.showCart });
 };

 componentDidMount() {
  document.body.addEventListener("click", (e) => this.handleOutsideClick(e));
  const fetch = async () => {
   let res = await fetchCategories();
   this.setState({ categories: res.data.data.categories });
  };
  fetch();
 }

 componentDidUpdate(prevProps) {
  if (this.props !== prevProps) {
   let quant = 0;
   this.props.cart &&
    this.props.cart.map((item) => {
     quant = item.quantity + quant;
    });
   this.setState({ quantity: quant });
  }
 }

 componentWillUnmount() {
  document.body.addEventListener("click", (e) => this.handleOutsideClick(e));
 }
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
 };
};

export default connect(mapStateToProps)(NavBar);
