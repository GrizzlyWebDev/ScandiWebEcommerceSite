import { Component } from "react";

import "./NavBar.css";
import logo from "../Assets/logo.svg";
import cartIcon from "../Assets/emptyCart.svg";
import chevronIcon from "../Assets/chevron.png";
import CurrencySelector from "./CurrencySelector";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
 state = {
  categories: [
   {
    title: "ALL",
    active: true,
   },
   {
    title: "CLOTHES",
    active: false,
   },
   {
    title: "TECH",
    active: false,
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
       <Link key={idx} to={`/${cat.title.toLowerCase()}`}>
        <li
         onClick={() => this.changeActive(cat.title)}
         className={cat.active ? "active" : null}
         key={cat.title}>
         {cat.title}
        </li>
       </Link>
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

 // executes when a category button is clicked
 changeActive = (title) => {
  // map through category array to find the selected category
  const updatedCategories = this.state.categories.map((cat) => {
   if (title === cat.title) {
    // update active class of selected category
    cat.active = true;
   } else {
    // diable active class of other categories
    cat.active = false;
   }
   return cat;
  });
  // set the state with the updated array
  this.setState({ categories: updatedCategories });
 };
}
