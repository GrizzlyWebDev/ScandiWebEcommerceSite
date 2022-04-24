import { Component } from "react";

import "./Loading.css";

class Loading extends Component {
 render() {
  return (
   <div className="loading-modal">
    <div className="modal-content">
     <p>Loading Products</p>
     <div className="dot-flashing"></div>
    </div>
   </div>
  );
 }
}

export default Loading;
