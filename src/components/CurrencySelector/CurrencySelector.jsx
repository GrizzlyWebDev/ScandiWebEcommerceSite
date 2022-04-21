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
   <>
    <div
     onClick={() => this.props.changeShowSelector()}
     className="currency-wrapper"></div>
    <div className="currency-selector">
     <ul onClick={() => this.props.changeShowSelector()}>
      {this.state.currencies &&
       this.state.currencies.map((currency) => (
        <li
         onClick={() => this.props.changeCurrency(currency)}
         className="currency"
         key={currency.label}>
         <p>{currency.symbol}</p>
         <h4>{currency.label}</h4>
        </li>
       ))}
     </ul>
    </div>
   </>
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
