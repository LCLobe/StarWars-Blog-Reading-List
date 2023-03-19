import React from "react";
import { Link, NavLink } from "react-router-dom";

import DropDown from "./DropDown.jsx";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          StarWars Home
        </Link>

        <DropDown />

      </div>
    </nav>
  );
};

export default NavBar;

{/* <div className="btn-group">
            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Favourites
            </button>
            
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
                <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
        </div> */}