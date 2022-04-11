import { Component } from "react";
// It is not advised to create your own html sanitizer
// So I will import one from the experts
import dompurify from "dompurify";

import "./PDP.css";
import { withParams } from "../../Hooks/useRouter";
import { fetchProduct } from "../../Hooks/useQuery";
import Catch from "../Catch/Catch";

class PDP extends Component {
 state = {
  product: null,
  selectedImage: null,
 };
 render() {
  const { product, selectedImage } = this.state;

  if (product) {
   return (
    <main>
     <div className="pdpContainer">
      <div className="productGallery">
       {product.gallery.map((pic, idx) => (
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
       <img src={selectedImage} alt="selected product" />
      </div>
      <div className="actionsContainer">
       <h1>{product.brand}</h1>
       <h4>{product.name}</h4>
       {product.attributes.map((attribute, idx) => (
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
        {product.prices[0].currency.symbol}
        {product.prices[0].amount}
       </p>
       <button className="addToCartButton" disabled={!product.inStock}>
        ADD TO CART
       </button>
       <p
        // render product description html string
        dangerouslySetInnerHTML={{
         // use dompurify to make sure html from server is not malicious
         __html: dompurify.sanitize(product.description),
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
  const fetch = async () => {
   let res = await fetchProduct(this.props.match.params.id);
   res.data.data.product && this.setState({ product: res.data.data.product });
   res.data.data.product.gallery &&
    this.setState({ selectedImage: res.data.data.product.gallery[0] });
  };
  fetch();
 }
}

export default withParams(PDP);
