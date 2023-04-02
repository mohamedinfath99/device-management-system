import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Common.css'

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">

        <div className="container-fluid m-5">
          <Link to="/" className="navbar-brand">
            DEVICE MANA<span className="logo">GEMENT SYSTEM</span>
          </Link>
        </div>
        
      </nav>
    </>
  );
};

export default Header;

