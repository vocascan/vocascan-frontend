import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PersonIcon from "@material-ui/icons/Person";

import Button from "@material-ui/core/Button";

import { signOut } from "../../redux/Actions/login";

import "./TopNav.scss";

function TopNav() {
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      <div className="title">
        <h1 className="text">{t("global.vocascan")}</h1>
      </div>
      <h3 className="user" onClick={handleClick}>
        <PersonIcon />
        {username || email}
        <div className={menuActive ? "menu-active" : "menu-inactive"}>
          <ul className="menu-list">
            <li className="menu-list-item">
              <Button className="menu-list-item-btn">{t("nav.profile")}</Button>
            </li>
            <li className="menu-list-item">
              <Button className="menu-list-item-btn">{t("nav.settings")}</Button>
            </li>
            <li className="menu-list-item" onClick={handleLogout}>
              <Button className="menu-list-item-btn">{t("nav.logout")}</Button>
            </li>
          </ul>
        </div>
      </h3>
    </div>
  );
}

export default TopNav;
