import { Component } from "react";

import "./NavBar.css";
import logo from "../../Assets/logo.svg";
import cartIcon from "../../Assets/emptyCart.svg";
import chevronIcon from "../../Assets/chevron.png";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
 state = {
  categories: [
   {
    title: "ALL",
   },
   {
    title: "CLOTHES",
   },
   {
    title: "TECH",
   },
  ],
  showSelector: false,
 };
 render() {
  return (
   <header>
    <nav>
     <ul className="navLinks">
      {this.state.categories.map((cat, idx) => (
       <li key={cat.title}>
        <NavLink key={idx} to={`/${cat.title.toLowerCase()}`}>
         {cat.title}
        </NavLink>
       </li>
      ))}
     </ul>
    </nav>
    <div className="logoContainer">
     <img className="shopLogo" alt="Shop Logo" src={logo} />
    </div>
    <div className="navButtons">
     <div
      onClick={() => this.setState({ showSelector: !this.state.showSelector })}
      className="currencyContainer">
      <span className="currencyIcon">$</span>
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
      {this.state.showSelector && <CurrencySelector />}
     </div>
     <div className="cartIconContainer">
      <img className="cartIcon" src={cartIcon} alt="shopping cart icon" />
      <span className="itemsInCart">2</span>
     </div>
    </div>
   </header>
  );
 }
}
