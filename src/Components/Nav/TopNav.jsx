import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";

import ThemeSwitch from "./ThemeSwitch.jsx";
import UpdateAvailable from "./UpdateAvailable.jsx";

import { available as updateAvailable } from "../../modules/update.js";
import { signOut } from "../../redux/Actions/login.js";

import LogoRound from "../../images/logo/transparent-round.svg";

import "./TopNav.scss";

const TopNav = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const username = useSelector((state) => state.login.user.username);
  const email = useSelector((state) => state.login.user.email);
  const isAdmin = useSelector((state) => state.login.user.isAdmin);

  return (
    <div className="top-nav">
      <div className="title">
        <img src={LogoRound} alt="" className="brand" />
      </div>
      <div className="nav-wrapper">
        {updateAvailable && (
          <div className="update">
            <UpdateAvailable />
          </div>
        )}
        <ThemeSwitch />
        <div className="user">
          <PersonIcon className="icon" />
          {username || email}
          <div className="menu">
            <ul className="menu-list">
              <li className="menu-list-item">
                <NavLink
                  tabIndex={-1}
                  to="/profile"
                  className="menu-list-item-btn"
                >
                  {t("nav.profile")}
                </NavLink>
              </li>
              <li className="menu-list-item">
                <NavLink
                  tabIndex={-1}
                  to="/settings"
                  className="menu-list-item-btn"
                >
                  {t("nav.settings")}
                </NavLink>
              </li>
              {isAdmin && (
                <li className="menu-list-item">
                  <NavLink
                    tabIndex={-1}
                    to="/admin"
                    className="menu-list-item-btn"
                  >
                    {t("nav.admin")}
                  </NavLink>
                </li>
              )}
              <li className="menu-list-item">
                <NavLink
                  tabIndex={-1}
                  to="/about"
                  className="menu-list-item-btn"
                >
                  {t("nav.about")}
                </NavLink>
              </li>
              <li className="menu-list-item" onClick={handleLogout}>
                <NavLink tabIndex={-1} to="/" className="menu-list-item-btn">
                  {t("nav.logout")}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
