import { Component } from "react";
import Card from "./Card";

import "./ProductList.css";

export default class ProductList extends Component {
 render() {
  return (
   <div className="productsContainer">
    {this.props.products.map((prod) => (
     <Card key={prod.id} product={prod} />
    ))}
   </div>
  );
 }
}
