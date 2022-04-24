import { Component } from "react";

import "./PLP.css";
import { withParams } from "../../HelperFunctions/routerWrapper";
import { fetchProducts } from "../../HelperFunctions/queries";
import Catch from "../Catch/Catch";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

class PLP extends Component {
 state = {
  products: null,
  pageFound: true,
  loading: true,
 };

 render() {
  // if category is found then show products
  // else show 404 page
  if (this.state.products && this.state.pageFound) {
   return (
    <main id="main">
     {this.state.products && (
      <>
       <div className="title-section">
        <h1>
         {this.props.match.params.category
          ? this.props.match.params.category.toUpperCase()
          : "ALL"}
        </h1>
       </div>
       {this.state.products && (
        <div className="products-container">
         {this.state.products.map((prod) => (
          <Card key={prod.id} product={prod} />
         ))}
        </div>
       )}
      </>
     )}
    </main>
   );
  } else if (this.state.loading) {
   return <Loading />;
  } else {
   return <Catch />;
  }
 }

 componentDidMount() {
  const fetch = async () => {
   // fetch products by category from the url paramaters
   let res = await fetchProducts(this.props.match.params.category);
   // if found set product state
   // else show 404 page
   if (!res.data) {
    this.setState({ loading: false });
    this.setState({ pageFound: false });
   }
   if (res.data.data.category) {
    this.setState({ loading: false });
    this.setState({ products: res.data.data.category.products });
    this.setState({ pageFound: true });
   } else {
    this.setState({ loading: false });
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
