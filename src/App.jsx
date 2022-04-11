import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Nav/NavBar.jsx";
import PLP from "./components/PLP/PLP.jsx";
import PDP from "./components/PDP/PDP.jsx";
import Cart from "./components/Cart.jsx";
import Catch from "./components/Catch/Catch.jsx";

export default class App extends Component {
 render() {
  return (
   <BrowserRouter forceRefresh={true}>
    <NavBar />
    <Routes>
     <Route exact path="/" element={<PLP />} />
     <Route path="/:category" element={<PLP />} />
     <Route path="/product/:id" element={<PDP />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="*" element={<Catch />} />
    </Routes>
   </BrowserRouter>
  );
 }
}
