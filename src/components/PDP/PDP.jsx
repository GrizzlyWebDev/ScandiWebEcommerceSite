import { Component } from "react";
// It is not advised to create your own html sanitizer
// So I will import one from the experts
import dompurify from "dompurify";

import "./PDP.css";
import { withParams } from "../../Hooks/useRouter";
import { fetchProduct } from "../../Hooks/useQuery";
import Catch from "../Catch/Catch";
import { connect } from "react-redux";

class PDP extends Component {
 state = {
  product: null,
  selectedImage: null,
  selectedOptions: [],
  itemAdded: false,
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
            {!item.value.includes("#") && (
             <button
              onClick={() =>
               this.changeSelected(attribute.name, item.value, idx)
              }
              className={`${
               this.state.selectedOptions[idx].name === attribute.name &&
               this.state.selectedOptions[idx].selection === item.value
                ? "selected"
                : ""
              }`}>
              {item.displayValue}
             </button>
            )}
            {item.value.includes("#") && (
             <span
              onClick={() =>
               this.changeSelected(attribute.name, item.value, idx)
              }
              className="swatch"
              style={{ backgroundColor: `${item.value}` }}>
              {this.state.selectedOptions[idx].name === attribute.name &&
              this.state.selectedOptions[idx].selection === item.value ? (
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#FFF"
                stroke="#1D1F22">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
               </svg>
              ) : null}
             </span>
            )}
           </li>
          ))}
         </ul>
        </div>
       ))}
       <p>PRICE:</p>
       <p>
        {product.prices.map((price) => {
         return price.currency.label === this.props.selectedCurrency.label
          ? price.currency.symbol + price.amount
          : null;
        })}
       </p>
       {!product.inStock && <p>This item is currently not in stock.</p>}
       <button
        className="addToCartButton"
        disabled={!product.inStock}
        onClick={this.addToCart}>
        {this.state.itemAdded ? "ITEM IN CART" : "ADD TO CART"}
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

 addToCart = () => {
  let prod = {
   id: this.state.product.id,
   brand: this.state.product.brand,
   title: this.state.product.name,
   thumb: this.state.product.gallery[0],
   prices: this.state.product.prices,
   attributes: this.state.product.attributes,
   selectedOptions: this.state.selectedOptions,
   gallery: this.state.product.gallery,
   quantity: 1,
  };

  if (this.props.cart) {
   for (let i = 0; i < this.props.cart.length; i++) {
    if (
     this.props.cart[i].title === prod.title &&
     this.props.cart[i].brand === prod.brand
    ) {
     this.setState({ itemAdded: true });
     return;
    }
   }
  }

  this.props.addToCart(prod);
 };

 changeSelected = (title, item, idx) => {
  let options = [...this.state.selectedOptions];
  options.splice(idx, 1, { name: title, selection: item });
  this.setState({ selectedOptions: options });
 };

 componentDidMount() {
  const fetch = async () => {
   let res = await fetchProduct(this.props.match.params.id);
   let defaultOptions = [];
   res.data.data.product && this.setState({ product: res.data.data.product });
   res.data.data.product.gallery &&
    this.setState({ selectedImage: res.data.data.product.gallery[0] });
   res.data.data.product.attributes &&
    res.data.data.product.attributes.map((attribute) =>
     defaultOptions.push({
      name: attribute.name,
      selection: attribute.items[0].value,
     })
    );
   this.setState({ selectedOptions: defaultOptions });
  };
  fetch();
 }

 componentDidUpdate(prevProps) {
  const fetch = async () => {
   let res = await fetchProduct(this.props.match.params.id);
   let defaultOptions = [];
   res.data.data.product && this.setState({ product: res.data.data.product });
   res.data.data.product.gallery &&
    this.setState({ selectedImage: res.data.data.product.gallery[0] });
   res.data.data.product.attributes &&
    res.data.data.product.attributes.map((attribute) =>
     defaultOptions.push({
      name: attribute.name,
      selection: attribute.items[0].value,
     })
    );
   this.setState({ selectedOptions: defaultOptions });
  };
  if (this.props.match.params.id !== prevProps.match.params.id) {
   fetch();
  }
 }
}

const mapStateToProps = (state) => {
 return {
  selectedCurrency: state.selectedCurrency,
  cart: state.cart,
 };
};

const mapDispatchToProps = (dispatch) => {
 return {
  addToCart: (product) => {
   dispatch({
    type: "ADD_PRODUCT",
    product: product,
   });
  },
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(PDP));
