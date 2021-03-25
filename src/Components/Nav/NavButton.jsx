import React from "react";
import { Link } from "react-router-dom";

import "./NavButton.scss";

function NavButton({ name, design = "default", link, icon = null }) {
  return (
    <Link to={link} className="nav-button-wrapper">
      <button className={`nav-button nav-button-${design}`}>
        {icon ? <span className="button-icon">{icon}</span> : null}
        <span className="button-name">{name}</span>
      </button>
    </Link>
  );
}

export default NavButton;
