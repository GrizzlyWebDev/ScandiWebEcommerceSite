import { Component } from "react";
import Card from "../Card/Card";

import "./ProductList.css";

export default class ProductList extends Component {
 render() {
  return (
   <div className="products-container">
    {this.props.products.map((prod) => (
     <Card key={prod.id} product={prod} />
    ))}
   </div>
  );
 }
}
