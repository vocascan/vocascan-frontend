import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InfoIcon from "@material-ui/icons/Info";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import LockIcon from "@material-ui/icons/Lock";
import MenuIcon from "@material-ui/icons/Menu";
import PolicyIcon from "@material-ui/icons/Policy";
import SecurityIcon from "@material-ui/icons/Security";
import SettingsIcon from "@material-ui/icons/Settings";
import StyleIcon from "@material-ui/icons/Style";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import useLinkCreator from "../../hooks/useLinkCreator.js";
import { signOut } from "../../redux/Actions/login.js";

import VocascanLogo from "../../images/logo/color-round.svg";

import "./MobileTopNav.scss";

import { useScrollBlock } from "../../hooks/useScrollBlock";
import { pages } from "../../utils/constants";
import NavButton from "./NavButton";

const MobileTopNav = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [blockScroll, allowScroll] = useScrollBlock();

  const location = useLocation();

  const [showNav, setShowNav] = useState(true);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const isAdmin = useSelector((state) => state.login.user.isAdmin);

  const { isValid: isLegalNoticeValid, url: legalNoticeUrl } = useLinkCreator({
    path: pages.legalNotice,
    electronFix: true,
  });
  const { isValid: isTermsAndConditionsValid, url: termsAndConditionsUrl } =
    useLinkCreator({ path: pages.termsAndConditions });
  const { isValid: isPrivacyPolicyValid, url: privacyPolicyUrl } =
    useLinkCreator({ path: pages.privacyPolicy });

  const triggerHamburgerMenu = useCallback(() => {
    setHamburgerOpen(!hamburgerOpen);
  }, [hamburgerOpen]);

  const closeHamburgerMenu = useCallback(() => {
    setHamburgerOpen(false);
  }, []);

  const listenScrollEvent = useCallback(() => {
    if (window.scrollY > 10) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [listenScrollEvent]);

  useEffect(() => {
    hamburgerOpen ? blockScroll() : allowScroll();
  }, [allowScroll, blockScroll, hamburgerOpen]);

  useEffect(() => {
    setHamburgerOpen(false);
  }, [location]);

  return (
    <>
      <div
        className={`mtn ${hamburgerOpen && "transparent"} ${
          !showNav && "hidden"
        }`}
      >
        <div className="mtn-inner">
          <Link className="mtn-link" to="/" onClick={closeHamburgerMenu}>
            <div className="mtn-link-inner">
              <img src={VocascanLogo} alt="Logo" />
              <p>Vocascan</p>
            </div>
          </Link>
          <MenuIcon className="hamburger-menu" onClick={triggerHamburgerMenu} />
        </div>
      </div>
      <div className={`mtn-menu ${hamburgerOpen ? "open" : "closed"}`}>
        <ul className="mtn-menu-list">
          <NavButton
            name={t("nav.learn")}
            icon={<LocalLibraryIcon />}
            link="/learn"
            exact
          />
          <NavButton
            name={t("nav.newVocab")}
            icon={<AddIcon />}
            link="/addVocab"
          />
          <NavButton
            name={t("nav.allVocabulary")}
            icon={<LibraryBooksIcon />}
            link="/library"
          />
          <NavButton
            name={t("nav.progress")}
            icon={<BarChartIcon />}
            link="/progress"
          />
          <NavButton
            name={t("nav.custom")}
            icon={<StyleIcon />}
            link="/custom"
          />
          <NavButton
            name={t("nav.profile")}
            icon={<AccountCircle />}
            link="/profile"
          />
          <NavButton
            name={t("nav.settings")}
            icon={<SettingsIcon />}
            link="/settings"
          />
          {isAdmin && (
            <NavButton
              name={t("nav.admin")}
              icon={<LockIcon />}
              link="/admin"
            />
          )}
          <NavButton name={t("nav.about")} icon={<InfoIcon />} link="/about" />
          <div onClick={handleLogout}>
            <NavButton
              name={t("nav.logout")}
              icon={<ExitToAppIcon />}
              link="/logout"
            />
          </div>
        </ul>
        <div className="mtn-external-link-wrapper">
          {isLegalNoticeValid && (
            <div className="mtn-external-link">
              <VerifiedUserIcon />
              <a target="_blank" href={legalNoticeUrl} rel="noreferrer">
                {t("global.legalNotice")}
              </a>
            </div>
          )}

          {isTermsAndConditionsValid && (
            <div className="mtn-external-link">
              <PolicyIcon />
              <a target="_blank" href={termsAndConditionsUrl} rel="noreferrer">
                {t("global.termsAndConditions")}
              </a>
            </div>
          )}

          {isPrivacyPolicyValid && (
            <div className="mtn-external-link">
              <SecurityIcon />
              <a target="_blank" href={privacyPolicyUrl} rel="noreferrer">
                {t("global.privacyPolicy")}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileTopNav;
