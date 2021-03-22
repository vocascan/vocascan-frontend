import React from "react";
import { Link } from "react-router-dom";
import "./NavButton.scss";

function NavButton(props) {
  return (
    <Link to={props.link} style={{ outline: 0, textDecoration: "none" }}>
      <button className="nav-button">{props.name}</button>
    </Link>
  );
}

export default NavButton;
