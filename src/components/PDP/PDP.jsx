import { Component } from "react";
// It is not advised to create your own html sanitizer
// So I will import one from the experts
import dompurify from "dompurify";

import "./PDP.css";
import { withParams } from "../../HelperFunctions/routerWrapper";
import { fetchProduct } from "../../HelperFunctions/queries";
import Catch from "../Catch/Catch";
import { connect } from "react-redux";
import AttributeButtons from "../AttributeButtons/AttributeButtons";
import { checkCart } from "../../HelperFunctions/useHelperFunctions";
import Loading from "../Loading/Loading";

class PDP extends Component {
 state = {
  pageFound: true,
  loading: true,
  product: null,
  selectedImage: null,
  selectedOptions: [],
  productQuantity: 1,
  itemAdded: false,
 };
 render() {
  const { product, selectedImage } = this.state;

  if (this.state.pageFound && product) {
   return (
    <main>
     <div className="pdp-container">
      <div className="product-gallery">
       {/* loop through and output each product photo
        change the selected photo on hover or click */}
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
      {/* main product image */}
      <div className="selected-image-container">
       <img src={selectedImage} alt="selected product" />
      </div>
      <div className="actions-container">
       <h1>{product.brand}</h1>
       <h4>{product.name}</h4>
       <AttributeButtons
        parent={"pdp"}
        product={product}
        changeSelectedDefault={this.changeSelectedDefault}
        selectedOptions={this.state.selectedOptions}
       />
       <div className="product-actions">
        <div className="product-price">
         <p>PRICE:</p>
         <p>
          {/* loop through prices array and find selected currency */}
          {product.prices.map((price) => {
           return price.currency.label === this.props.selectedCurrency.label
            ? price.currency.symbol + price.amount
            : null;
          })}
         </p>
        </div>
        <div>
         <p>QUANTITY:</p>
         <div className="pdp-quantity">
          <button onClick={() => this.decrement(this.props.index)}>-</button>

          <p>{this.state.productQuantity}</p>
          <button onClick={() => this.increment(this.props.index)}>+</button>
         </div>
        </div>
       </div>

       {!product.inStock && <p>This item is currently not in stock.</p>}
       <button
        className="add-to-cart-button"
        disabled={!product.inStock}
        onClick={this.addToCart}>
        {this.state.itemAdded ? "ADDED TO CART" : "ADD TO CART"}
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
   /* if no product is returned show 404 page */
  } else if (this.state.loading) {
   return <Loading />;
  } else {
   return <Catch />;
  }
 }

 increment = () => {
  this.setState({ productQuantity: this.state.productQuantity + 1 });
 };

 decrement = () => {
  this.state.productQuantity >= 2 &&
   this.setState({ productQuantity: this.state.productQuantity - 1 });
 };

 addToCart = () => {
  // change add to cart button text for 300 milliseconds for user feedback
  this.setState({ itemAdded: true });
  setTimeout(() => {
   this.setState({ itemAdded: false });
  }, 300);
  // create object to hold the item you are adding to cart
  let response = checkCart(
   this.props.cart,
   this.state.product,
   this.state.selectedOptions,
   this.state.productQuantity
  );
  let contains = response.contains;
  let productIndex = response.productIndex;
  let prod = response.prod;
  // if there are items in the cart
  if (this.props.cart.length > 0) {
   // if item is in cart increment by selected quantity
   contains === true &&
    this.props.increment(productIndex, this.state.productQuantity);
   // if item is not in the cart add it to the cart
   contains === false && this.props.addToCart(prod);
  } else {
   // if there is nothing in the cart just add the item
   this.props.addToCart(prod);
  }
 };

 changeSelectedDefault = (title, item, idx) => {
  // spread previous selected options
  let options = [...this.state.selectedOptions];
  // insert new option at index
  options.splice(idx, 1, { name: title, selection: item });
  // set current state with updated options
  this.setState({ selectedOptions: options });
 };

 componentDidMount() {
  const fetch = async () => {
   let res = await fetchProduct(this.props.match.params.id);
   let defaultOptions = [];
   // if product is found on server set the product state
   res.data.data.product && this.setState({ product: res.data.data.product });
   // if product is not found show 404 page
   if (!res.data.data.product) {
    this.setState({ loading: false });
    this.setState({ pageFound: false });
    return;
   }
   // if the product has an image gallery set the selected image to first option
   res.data.data.product.gallery &&
    this.setState({ selectedImage: res.data.data.product.gallery[0] });
   // if the product has attributes map through and set the default
   // to the first available option
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
   // if product is found on server set the product state
   res.data.data.product && this.setState({ product: res.data.data.product });
   // if product is not found show 404 page
   if (!res.data.data.product) {
    this.setState({ pageFound: false });
    return;
   }
   // if the product has an image gallery set the selected image to first option
   res.data.data.product.gallery &&
    this.setState({ selectedImage: res.data.data.product.gallery[0] });
   // if the product has attributes map through and set the default
   // to the first available option
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
  increment: (idx, quantity) => {
   dispatch({
    type: "INCREMENT_QUANTITY",
    index: idx,
    amount: quantity,
   });
  },
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(PDP));
