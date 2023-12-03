// Login.js
import React from "react";
import Img_logo from "./images/amrit.png";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src={Img_logo} alt="" />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
