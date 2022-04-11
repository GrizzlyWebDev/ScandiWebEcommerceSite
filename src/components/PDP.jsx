import { Component } from "react";
import axios from "axios";
// It is not advised to create your own html sanitizer
// So I will import one from the experts
import dompurify from "dompurify";

import "./PDP.css";
import Catch from "./Catch";

class PDP extends Component {
 state = {
  product: null,
  selectedImage: null,
 };

 render() {
  if (this.state.product) {
   return (
    <main>
     <div className="pdpContainer">
      <div className="productGallery">
       {this.state.product.gallery.map((pic, idx) => (
        <img
         onMouseOver={() => this.setState({ selectedImage: pic })}
         onClick={() => this.setState({ selectedImage: pic })}
         src={pic}
         alt="product"
         key={idx}
        />
       ))}
      </div>
      <div className="selectedImageContainer">
       <img src={this.state.selectedImage} alt="selected product" />
      </div>
      <div className="actionsContainer">
       <h1>{this.state.product.brand}</h1>
       <h4>{this.state.product.name}</h4>
       {this.state.product.attributes.map((attribute, idx) => (
        <div className="productAttributes" key={idx}>
         <p key={attribute.id}>{attribute.name.toUpperCase()}:</p>
         <ul key={idx}>
          {attribute.items.map((item) => (
           <li key={item.id}>
            {!item.value.includes("#") && <button>{item.displayValue}</button>}
            {item.value.includes("#") && (
             <span
              className="swatch"
              style={{ backgroundColor: `${item.value}` }}></span>
            )}
           </li>
          ))}
         </ul>
        </div>
       ))}
       <p>PRICE:</p>
       <p>
        {this.state.product.prices[0].currency.symbol}
        {this.state.product.prices[0].amount}
       </p>
       <button
        className="addToCartButton"
        disabled={!this.state.product.inStock}>
        ADD TO CART
       </button>
       <p
        // render product description html string
        dangerouslySetInnerHTML={{
         // use dompurify to make sure html from server is not malicious
         __html: dompurify.sanitize(this.state.product.description),
        }}></p>
      </div>
     </div>
    </main>
   );
  } else {
   return <Catch />;
  }
 }

 componentDidMount() {
  let res;
  const fetchProduct = async () => {
   const query = `query($id: String!) {
    product(id: $id) {
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
    `;
   const variables = {
    id: this.props.match.params.id,
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
   res.data.data.product && this.setState({ product: res.data.data.product });
   res.data.data.product.gallery &&
    this.setState({ selectedImage: res.data.data.product.gallery[0] });
  };
  fetchProduct();
 }
}

export default PDP;
