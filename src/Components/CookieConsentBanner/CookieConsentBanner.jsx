import React from "react";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";

import { pages } from "../../utils/constants.js";

import "./CookieConsentBanner.scss";

import useLinkCreator from "../../hooks/useLinkCreator";

const CookieConsentBanner = () => {
  const { t } = useTranslation();

  const { isValid: isPrivacyPolicyValid, url: privacyPolicyUrl } =
    useLinkCreator({ path: pages.privacyPolicy });

  return (
    <>
      {isPrivacyPolicyValid && window.VOCASCAN_CONFIG.ENV === "web" && (
        <CookieConsent
          buttonText={t("components.cookieConsent.accept")}
          cookieName="redux-strings"
          disableStyles
        >
          {t("components.cookieConsent.text")}
          <a
            className="cookie-consent-link"
            href={privacyPolicyUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("components.cookieConsent.learnMore")}
          </a>
        </CookieConsent>
      )}
    </>
  );
};

export default CookieConsentBanner;
