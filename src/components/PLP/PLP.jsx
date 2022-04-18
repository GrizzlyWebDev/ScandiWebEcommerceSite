import { Component } from "react";

import "./PLP.css";
import { withParams } from "../../Hooks/useRouter";
import { fetchProducts } from "../../Hooks/useQuery";
import ProductList from "../ProductList/ProductList";
import Catch from "../Catch/Catch";

class PLP extends Component {
 state = {
  products: null,
  pageFound: true,
 };

 render() {
  const { products } = this.state;
  const { category } = this.props.match.params;
  if (products && this.state.pageFound) {
   return (
    <main id="main">
     {products && (
      <div className="titleSection">
       <h1>{category ? category.toUpperCase() : "ALL"}</h1>
      </div>
     )}
     <div>{products && <ProductList products={products} />}</div>
    </main>
   );
  } else if (!this.state.pageFound) {
   return <Catch />;
  }
 }

 componentDidMount() {
  const fetch = async () => {
   let res = await fetchProducts(this.props.match.params.category);
   res.data.data.category
    ? this.setState({ products: res.data.data.category.products })
    : this.setState({ pageFound: false });
  };
  fetch();
 }

 componentDidUpdate(prevProps) {
  const fetch = async () => {
   let res = await fetchProducts(this.props.match.params.category);
   res.data.data.category
    ? this.setState({ products: res.data.data.category.products })
    : this.setState({ pageFound: true });
  };
  if (this.props.match.params.category !== prevProps.match.params.category) {
   fetch();
  }
 }
}

export default withParams(PLP);
