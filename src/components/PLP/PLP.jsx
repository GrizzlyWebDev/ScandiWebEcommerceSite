import { Component } from "react";

import "./PLP.css";
import { withParams } from "../../HelperFunctions/routerWrapper";
import { fetchProducts } from "../../HelperFunctions/queries";
import Catch from "../Catch/Catch";
import Card from "../Card/Card";

class PLP extends Component {
 state = {
  products: null,
  pageFound: true,
 };

 render() {
  const { products } = this.state;
  const { category } = this.props.match.params;
  // if category is found then show products
  // else show 404 page
  if (products && this.state.pageFound) {
   return (
    <main id="main">
     {products && (
      <>
       <div className="title-section">
        <h1>{category ? category.toUpperCase() : "ALL"}</h1>
       </div>
       {products && (
        <div className="products-container">
         {products.map((prod) => (
          <Card key={prod.id} product={prod} />
         ))}
        </div>
       )}
      </>
     )}
    </main>
   );
  } else if (!this.state.pageFound) {
   return <Catch />;
  }
 }

 componentDidMount() {
  const fetch = async () => {
   // fetch products by category from the url paramaters
   let res = await fetchProducts(this.props.match.params.category);
   // if found set product state
   // else show 404 page
   if (res.data.data.category) {
    this.setState({ products: res.data.data.category.products });
    this.setState({ pageFound: true });
   } else {
    this.setState({ pageFound: false });
   }
  };
  fetch();
 }

 componentDidUpdate(prevProps) {
  const fetch = async () => {
   // fetch products by category from the url paramaters
   let res = await fetchProducts(this.props.match.params.category);
   // if found set product state
   // else show 404 page
   if (res.data.data.category) {
    this.setState({ products: res.data.data.category.products });
    this.setState({ pageFound: true });
   }
  };
  if (this.props.match.params.category !== prevProps.match.params.category) {
   fetch();
  }
 }
}

// added a wrapper to get params from URL
export default withParams(PLP);
