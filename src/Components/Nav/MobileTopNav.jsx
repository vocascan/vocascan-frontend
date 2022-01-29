import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PolicyIcon from "@material-ui/icons/Policy";
import SecurityIcon from "@material-ui/icons/Security";
import StyleIcon from "@material-ui/icons/Style";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import useLinkCreator from "../../hooks/useLinkCreator.js";

import HamburgerMenuIcon from "../../images/icons/hamburger.svg";
import VocascanLogo from "../../images/logo/color-round.svg";

import "./MobileTopNav.scss";

import { useScrollBlock } from "../../hooks/useScrollBlock";
import { pages } from "../../utils/constants";
import NavButton from "./NavButton";

const MobileTopNav = () => {
  const { t } = useTranslation();
  const [blockScroll, allowScroll] = useScrollBlock();

  const [showNav, setShowNav] = useState(true);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [listenScrollEvent]);

  useEffect(() => {
    hamburgerOpen ? blockScroll() : allowScroll();
  }, [allowScroll, blockScroll, hamburgerOpen]);

  return (
    <>
      <div
        className={`mobile-top-nav ${hamburgerOpen && "transparent"} ${
          !showNav && "hidden"
        }`}
      >
        <div className="mobile-top-nav-inner">
          <Link to="/" onClick={closeHamburgerMenu}>
            <div className="link-wrapper">
              <img src={VocascanLogo} alt="Logo" />
              <p>Vocascan</p>
            </div>
          </Link>
          <img
            className="hamburger-menu"
            src={HamburgerMenuIcon}
            alt="menu"
            onClick={triggerHamburgerMenu}
          />
        </div>
      </div>
      <div className={`mobile-top-nav-menu ${hamburgerOpen && "active"}`}>
        <ul className="nav-list">
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
        </ul>
        <div className="nav-legal">
          {isLegalNoticeValid && (
            <div className="nav-legal-wrapper">
              <VerifiedUserIcon />
              <a target="_blank" href={legalNoticeUrl} rel="noreferrer">
                {t("global.legalNotice")}
              </a>
            </div>
          )}

          {isTermsAndConditionsValid && (
            <div className="nav-legal-wrapper">
              <PolicyIcon />
              <a target="_blank" href={termsAndConditionsUrl} rel="noreferrer">
                {t("global.termsAndConditions")}
              </a>
            </div>
          )}

          {isPrivacyPolicyValid && (
            <div className="nav-legal-wrapper">
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
