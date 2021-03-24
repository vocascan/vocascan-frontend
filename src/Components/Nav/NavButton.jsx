import React from "react";
import { Link } from "react-router-dom";

import "./NavButton.scss";

function NavButton({ name, link, icon = null }) {
  return (
    <Link to={link} style={{ outline: 0, textDecoration: "none" }}>
      <button className="nav-button">
        {icon ? <span className="button-icon">{icon}</span> : null}
        <span className="button-name">{name}</span>
      </button>
    </Link>
  );
}

export default NavButton;
