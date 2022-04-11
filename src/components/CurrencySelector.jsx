import { Component } from "react";

import "./CurrencySelector.css";

export default class CurrencySelector extends Component {
 state = {
  currencies: [
   {
    name: "USD",
    symbol: "$",
   },
   {
    name: "EUR",
    symbol: "€",
   },
   {
    name: "JPY",
    symbol: "¥",
   },
  ],
 };

 render() {
  return (
   <div className="currencySelector">
    <ul>
     {this.state.currencies.map((currency) => (
      <li key={currency.name}>
       <p>{currency.symbol}</p>
       <p>{currency.name}</p>
      </li>
     ))}
    </ul>
   </div>
  );
 }
}
