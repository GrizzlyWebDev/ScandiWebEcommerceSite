import { Component } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import NavBar from "./components/Nav/NavBar.jsx";
import PLP from "./components/PLP/PLP.jsx";
import PDP from "./components/PDP/PDP.jsx";
import Cart from "./components/Cart.jsx";
import Catch from "./components/Catch/Catch.jsx";

export default class App extends Component {
 render() {
  // using wrapper to get params from the id in the route
  const PDPWrapper = (props) => {
   // use params not available on class components
   const params = useParams();
   // wrap class comoponent with function to
   // pass params as a prop to the PDP page
   return <PDP {...{ ...props, match: { params } }} />;
  };

  const PLPWrapper = (props) => {
   // use params not available on class components
   const params = useParams();
   // wrap class comoponent with function to
   // pass params as a prop to the PDP page
   return <PLP {...{ ...props, match: { params } }} />;
  };

  return (
   <BrowserRouter forceRefresh={true}>
    <NavBar />
    <Routes>
     <Route exact path="/" element={<PLPWrapper />} />
     <Route path="/:category" element={<PLPWrapper />} />
     <Route path="/product/:id" element={<PDPWrapper />} />
     <Route path="/cart" element={<Cart />} />
     <Route path="*" element={<Catch />} />
    </Routes>
   </BrowserRouter>
  );
 }
}
