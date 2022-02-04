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
        className={`w-full h-16 fixed flex overflow-hidden top-0 z-50 opacity-100 ease-in-out duration-700 delay-0 ${
          hamburgerOpen && "bg-transparent"
        } ${!showNav && "hidden"} md:hidden`}
      >
        <div className="w-5/6 h-full flex flex-row justify-between items-center m-auto">
          <Link className="no-underline" to="/" onClick={closeHamburgerMenu}>
            <div className="flex items-center no-underline">
              <img className="w-8" src={VocascanLogo} alt="Logo" />
              <p className="font-light pl-3 text-base uppercase">Vocascan</p>
            </div>
          </Link>
          <img
            className="w-10"
            src={HamburgerMenuIcon}
            alt="menu"
            onClick={triggerHamburgerMenu}
          />
        </div>
      </div>
      <div
        className={`w-full h-full top-0 left-0 overflow-hidden items-center ease-in-out duration-700 delay-0 ${
          hamburgerOpen
            ? "opacity-100 z-10 flex flex-col justify-center relative"
            : "opacity-0 -z-10 hidden"
        } md:hidden`}
      >
        <ul className="w-full h-5/6 flex flex-col">
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
        <div className="text-white my-2 mx-auto text-base opacity-0">
          {isLegalNoticeValid && (
            <div className="flex items-center my-1">
              <VerifiedUserIcon />
              <a
                className="ml-1 text-white no-underline"
                target="_blank"
                href={legalNoticeUrl}
                rel="noreferrer"
              >
                {t("global.legalNotice")}
              </a>
            </div>
          )}

          {isTermsAndConditionsValid && (
            <div className="flex items-center my-1">
              <PolicyIcon />
              <a
                className="ml-1 text-white no-underline"
                target="_blank"
                href={termsAndConditionsUrl}
                rel="noreferrer"
              >
                {t("global.termsAndConditions")}
              </a>
            </div>
          )}

          {isPrivacyPolicyValid && (
            <div className="flex items-center my-1">
              <SecurityIcon />
              <a
                className="ml-1 text-white no-underline"
                target="_blank"
                href={privacyPolicyUrl}
                rel="noreferrer"
              >
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
