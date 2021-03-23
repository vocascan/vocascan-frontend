import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";

import { signOut } from "../../redux/Actions/login";

import "./TopNav.scss";

function TopNav() {
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();

  function handleClick() {
    setMenuActive((value) => !value);
  }

  //call redux store function to log out user
  function handleLogout() {
    dispatch(signOut());
  }

  const username = useSelector((state) => state.login.user.username);
  const email = useSelector((state) => state.login.user.email);

  return (
    <div className="top-nav">
      <h3 className="user" onClick={handleClick}>
        {username || email}
      </h3>
      <div className={menuActive ? "menu-active" : "menu-inactive"}>
        <ul className="menu-list">
          <li className="menu-list-item">
            <Button className="menu-list-item-btn">Profile</Button>
          </li>
          <li className="menu-list-item">
            <Button className="menu-list-item-btn">Settings</Button>
          </li>
          <li className="menu-list-item" onClick={handleLogout}>
            <Button className="menu-list-item-btn">Log out</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TopNav;
