import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PersonIcon from "@material-ui/icons/Person";

import Button from "@material-ui/core/Button";

import { signOut } from "../../redux/Actions/login";
import { NavLink } from "react-router-dom";

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
