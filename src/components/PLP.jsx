import { Component } from "react";
import axios from "axios";

import "./PLP.css";
import ProductList from "./ProductList";
import Catch from "./Catch";

export default class PLP extends Component {
 state = {
  products: null,
 };

 render() {
  return (
   <main>
    {this.state.products && (
     <div className="titleSection">
      <h1>
       {this.props.match.params.category
        ? this.props.match.params.category.toUpperCase()
        : "ALL"}
      </h1>
     </div>
    )}
    <div>
     {this.state.products && <ProductList products={this.state.products} />}
     {!this.state.products && <Catch />}
    </div>
   </main>
  );
 }

 componentDidMount() {
  let res;
  const fetchProducts = async () => {
   const query = `query($categoryName: CategoryInput) {
    category(input: $categoryName) {
      products {
        id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
      }
    }
  }
  `;
   const variables = {
    categoryName: {
     // check if route has params, if not category equals all
     title: this.props.match.params.category
      ? this.props.match.params.category
      : "all",
    },
   };
   try {
    res = await axios({
     method: "post",
     url: "http://localhost:4000",
     data: { query, variables },
    });
   } catch (err) {
    console.log(err);
   }
   res.data.data.category
    ? this.setState({ products: res.data.data.category.products })
    : this.setState({ products: null });
  };
  fetchProducts();
 }

 componentDidUpdate(prevProps) {
  let res;
  const fetchProducts = async () => {
   const query = `query($categoryName: CategoryInput) {
    category(input: $categoryName) {
      products {
        id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
      }
    }
  }
   `;
   const variables = {
    categoryName: {
     title: this.props.match.params.category
      ? this.props.match.params.category
      : "all",
    },
   };
   try {
    res = await axios({
     method: "post",
     url: "http://localhost:4000",
     data: { query, variables },
    });
   } catch (err) {
    console.log(err);
   }

   this.setState({ products: res.data.data.category.products });
  };
  if (this.props.match.params.category !== prevProps.match.params.category) {
   fetchProducts();
  }
 }
}
