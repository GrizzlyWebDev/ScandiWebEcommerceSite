import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Nav/NavBar.jsx";
import PLP from "./components/PLP/PLP.jsx";
import PDP from "./components/PDP/PDP.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Catch from "./components/Catch/Catch.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";

class App extends Component {
 render() {
  return (
   <BrowserRouter forceRefresh={true}>
    <NavBar />
    <Routes>
     <Route exact path="/" element={<PLP />} />
     <Route path="/:category" element={<PLP />} />
     <Route path="/product/:id" element={<PDP />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="/checkout" element={<Checkout />} />
     <Route path="*" element={<Catch />} />
    </Routes>
   </BrowserRouter>
  );
 }
}

export default App;
