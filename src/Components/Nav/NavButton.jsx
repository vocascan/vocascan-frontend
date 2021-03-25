import React from "react";
import { NavLink } from "react-router-dom";

import "./NavButton.scss";

function NavButton({ name, design = "default", link, icon = null }) {
  return (
    <NavLink to={link} activeClassName="nav-button-active" className="nav-button-wrapper">
      <button className={`nav-button nav-button-${design}`}>
        {icon ? <span className="button-icon">{icon}</span> : null}
        <span className="button-name">{name}</span>
      </button>
    </NavLink>
  );
}

export default NavButton;
