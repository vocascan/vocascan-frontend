import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";

import PersonIcon from "@material-ui/icons/Person";

import { signOut } from "../../redux/Actions/login.js";

import "./TopNav.scss";

function TopNav() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      <div className="user">
        <PersonIcon />
        {username || email}
        <div className="menu">
          <ul className="menu-list">
            <li className="menu-list-item">
              <NavLink to="/profile" className="menu-list-item-btn">
                {t("nav.profile")}
              </NavLink>
            </li>
            <li className="menu-list-item">
              <NavLink to="/settings" className="menu-list-item-btn">
                {t("nav.settings")}
              </NavLink>
            </li>
            <li className="menu-list-item" onClick={handleLogout}>
              <Button className="menu-list-item-btn">{t("nav.logout")}</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
