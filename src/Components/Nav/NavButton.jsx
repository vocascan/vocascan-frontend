import React from "react";
import { NavLink } from "react-router-dom";

import "./NavButton.scss";

const NavButton = ({
  name,
  link,
  icon = null,
  exact = false,
  onClick = {},
}) => {
  return (
    <NavLink
      to={link}
      activeClassName="nav-button-active"
      className="nav-button-wrapper"
      exact={exact}
      tabIndex={-1}
    >
      <button tabIndex={-1} className={`nav-button`} onClick={onClick}>
        <div className="nav-button-inner">
          {icon ? <span className="button-icon">{icon}</span> : null}
          <span className="button-name">{name}</span>
        </div>
      </button>
    </NavLink>
  );
};

export default NavButton;
