import React from "react";
import { Link, NavLink } from "react-router-dom";

import DropDown from "./DropDown.jsx";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="navbar-text">StarWars Home</span> 
        </Link>

        <DropDown />

      </div>
    </nav>
  );
};

export default NavBar;