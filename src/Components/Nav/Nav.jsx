import React from "react";
import { useTranslation } from "react-i18next";

import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PolicyIcon from "@material-ui/icons/Policy";
import SecurityIcon from "@material-ui/icons/Security";
import StyleIcon from "@material-ui/icons/Style";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import NavButton from "./NavButton.jsx";

import useLinkCreator from "../../hooks/useLinkCreator.js";

import "./Nav.scss";

import { pages } from "../../utils/constants";

const Nav = () => {
  const { t } = useTranslation();

  const { isValid: isLegalNoticeValid, url: legalNoticeUrl } = useLinkCreator({
    path: pages.legalNotice,
    electronFix: true,
  });
  const { isValid: isTermsAndConditionsValid, url: termsAndConditionsUrl } =
    useLinkCreator({ path: pages.termsAndConditions });
  const { isValid: isPrivacyPolicyValid, url: privacyPolicyUrl } =
    useLinkCreator({ path: pages.privacyPolicy });

  return (
    <div className="nav">
      <ul className="button-list">
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
        <NavButton name={t("nav.custom")} icon={<StyleIcon />} link="/custom" />
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
  );
};

export default Nav;
