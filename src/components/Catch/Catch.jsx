import { Component } from "react";

import "./Catch.css";
import four from "../../Assets/fourOhFour.png";
import { Link } from "react-router-dom";

export default class Catch extends Component {
 render() {
  return (
   <div className="catch-container">
    <img src={four} alt="404" />
    <div className="text-container">
     <h1>Page Not Found...</h1>
     <p>perhaps it's time for some coffee.</p>
     <Link to="/all">
      <button>GO BACK</button>
     </Link>
    </div>
   </div>
  );
 }
}
