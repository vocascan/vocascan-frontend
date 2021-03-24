import React from "react";
import { Link } from "react-router-dom";

import "./NavButton.scss";

function NavButton({ name, link }) {
  return (
    <Link to={link} style={{ outline: 0, textDecoration: "none" }}>
      <button className="nav-button">{name}</button>
    </Link>
  );
}

export default NavButton;
