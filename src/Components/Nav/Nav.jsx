import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PolicyIcon from "@material-ui/icons/Policy";
import SecurityIcon from "@material-ui/icons/Security";
import StyleIcon from "@material-ui/icons/Style";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import LinkCreator from "../LinkCreator/LinkCreator.jsx";
import NavButton from "./NavButton.jsx";

import "./Nav.scss";

const Nav = () => {
  const { t } = useTranslation();
  const menuStyle = useSelector((state) => state.setting.menuStyle);
  const [initialStyle, setInitialStyle] = useState(menuStyle);
  const [loading, setLoading] = useState(false);

  const navLayoutClasses = clsx(
    "nav",
    `nav-${menuStyle}`,
    loading && "nav-loading"
  );

  useEffect(() => {
    if (menuStyle === initialStyle) {
      return;
    }

    setLoading(true);
    setInitialStyle(menuStyle);
    let timer = setTimeout(() => setLoading(false), 400);

    return () => {
      clearTimeout(timer);
    };
    // initialStyle counts only for initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuStyle]);

  return (
    <div className={navLayoutClasses}>
      <ul className="button-list">
        <NavButton
          name={t("nav.learn")}
          design={menuStyle}
          icon={<LocalLibraryIcon />}
          link="/learn"
          exact
        />
        <NavButton
          name={t("nav.newVocab")}
          design={menuStyle}
          icon={<AddIcon />}
          link="/addVocab"
        />
        <NavButton
          name={t("nav.allVocabulary")}
          design={menuStyle}
          icon={<LibraryBooksIcon />}
          link="/library"
        />
        <NavButton
          name={t("nav.progress")}
          design={menuStyle}
          icon={<BarChartIcon />}
          link="/progress"
        />
        <NavButton
          name={t("nav.custom")}
          design={menuStyle}
          icon={<StyleIcon />}
          link="/custom"
        />
      </ul>

      <div className="nav-legal">
        <LinkCreator path="/legal-notice" electronFix>
          {({ isValid, url }) =>
            isValid && (
              <div className="nav-legal-wrapper">
                <VerifiedUserIcon />
                <a href={url}>{t("global.legalNotice")}</a>
              </div>
            )
          }
        </LinkCreator>

        <LinkCreator path="/terms-and-conditions">
          {({ isValid, url }) =>
            isValid && (
              <div className="nav-legal-wrapper">
                <PolicyIcon />
                <a href={url}>{t("global.termsAndConditions")}</a>
              </div>
            )
          }
        </LinkCreator>

        <LinkCreator path="/privacy-policy">
          {({ isValid, url }) =>
            isValid && (
              <div className="nav-legal-wrapper">
                <SecurityIcon />
                <a href={url}>{t("global.privacyPolicy")}</a>
              </div>
            )
          }
        </LinkCreator>
      </div>
    </div>
  );
};

export default Nav;
