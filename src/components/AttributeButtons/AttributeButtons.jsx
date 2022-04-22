import { Component } from "react";
import { connect } from "react-redux";

import "./AttributeButtons.css";

class AttributeButtons extends Component {
 state = {};
 render() {
  return (
   <>
    {/* if product prop is coming from redux */}
    {this.props.product.selectedOptions &&
     this.props.product.attributes.map((attribute, idx) => (
      //  add parent component name for dynamic styling
      <div className={`${this.props.parent + "-product-attributes"}`} key={idx}>
       <h4 key={attribute.id}>{attribute.name.toUpperCase()}:</h4>
       <ul key={idx}>
        {/* loop through product attributes and display 
           options for each attribute depending on if they
           are an option or a swatch */}
        {attribute.items.map((item) => (
         <li key={item.id}>
          {!item.value.includes("#") && (
           <span
            // change selection of item in cart
            onClick={() =>
             this.props.changeSelection(
              idx,
              this.props.index,
              attribute.name,
              item.value,
              this.props.product.title
             )
            }
            // change class to selected if products selection matches
            className={`${
             this.props.product.selectedOptions[idx].name === attribute.name &&
             this.props.product.selectedOptions[idx].selection === item.value
              ? this.props.parent + "-selected"
              : this.props.parent + "-options"
            }`}>
            {item.value}
           </span>
          )}
          {/* if item includes a hash then it is a hex value and should be a swatch */}
          {item.value.includes("#") && (
           <div
            // change class to selected if products selection matches
            className={`${
             this.props.product.selectedOptions[idx].name === attribute.name &&
             this.props.product.selectedOptions[idx].selection === item.value
              ? this.props.parent + "-active-swatch-outline"
              : this.props.parent + "-swatch-outline"
            }`}>
            <span
             onClick={() =>
              this.props.changeSelection(
               idx,
               this.props.index,
               attribute.name,
               item.value,
               this.props.product.title
              )
             }
             className={`${this.props.parent + "-swatch"}`}
             style={{ backgroundColor: `${item.value}` }}></span>
           </div>
          )}
         </li>
        ))}
       </ul>
      </div>
     ))}
    {/* if product is coming from server */}
    {!this.props.product.selectedOptions &&
     this.props.product.attributes.map((attribute, idx) => (
      //  add name of parent component for dynamic styling
      <div className={`${this.props.parent + "-product-attributes"}`} key={idx}>
       <h4 key={attribute.id}>{attribute.name.toUpperCase()}:</h4>
       <ul key={idx}>
        {/* loop through product attributes and display 
           options for each attribute depending on if they
           are an option or a swatch */}
        {attribute.items.map((item) => (
         <li key={item.id}>
          {!item.value.includes("#") && (
           <span
            // change default selection of product before adding to cart
            onClick={() =>
             this.props.changeSelectedDefault(attribute.name, item.value, idx)
            }
            // change class to selected if products selection matches
            className={`${
             this.props.selectedOptions[idx].name === attribute.name &&
             this.props.selectedOptions[idx].selection === item.value
              ? this.props.parent + "-selected"
              : this.props.parent + "-options"
            }`}>
            {item.value}
           </span>
          )}
          {/* if item includes a hash then it is a hex value and should be a swatch */}
          {item.value.includes("#") && (
           <div
            // change class to active if products selection matches
            className={`${
             this.props.selectedOptions[idx].name === attribute.name &&
             this.props.selectedOptions[idx].selection === item.value
              ? this.props.parent + "-active-swatch-outline"
              : this.props.parent + "-swatch-outline"
            }`}>
            <span
             // change default selection of product before adding to cart
             onClick={() =>
              this.props.changeSelectedDefault(attribute.name, item.value, idx)
             }
             className={`${this.props.parent + "-swatch"}`}
             style={{ backgroundColor: `${item.value}` }}></span>
           </div>
          )}
         </li>
        ))}
       </ul>
      </div>
     ))}
   </>
  );
 }
}

const mapDispatchToProps = (dispatch) => {
 return {
  changeSelection: (idx, productIndex, title, item, productName) => {
   dispatch({
    type: "CHANGE_SELECTION",
    index: idx,
    productIndex: productIndex,
    title: title,
    selection: item,
    productName: productName,
   });
  },
 };
};

export default connect(null, mapDispatchToProps)(AttributeButtons);
