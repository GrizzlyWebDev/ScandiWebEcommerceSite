import React, { Component } from "react";
import { fetchCurrencyList } from "../../Hooks/useQuery";
import { connect } from "react-redux";

import "./CurrencySelector.css";

class CurrencySelector extends Component {
 state = {
  currencies: null,
 };

 render() {
  return (
   <div className="currencySelector">
    <ul>
     {this.state.currencies &&
      this.state.currencies.map((currency) => (
       <li
        onClick={() => this.props.changeCurrency(currency)}
        className="currency"
        key={currency.label}>
        <p>{currency.symbol}</p>
        <p>{currency.label}</p>
       </li>
      ))}
    </ul>
   </div>
  );
 }

 componentDidMount() {
  const fetch = async () => {
   let res = await fetchCurrencyList();
   this.setState({ currencies: res.data.data.currencies });
  };
  fetch();
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
  changeCurrency: (currency) => {
   dispatch({
    type: "CHANGE_CURRENCY",
    currency: currency,
   });
  },
 };
};

export default connect(null, mapDispatchToProps)(CurrencySelector);
