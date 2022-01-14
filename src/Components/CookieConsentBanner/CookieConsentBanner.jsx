import React from "react";
import CookieConsent from "react-cookie-consent";

import { pages } from "../../utils/constants.js";

import "./CookieConsentBanner.scss";

import useLinkCreator from "../../hooks/useLinkCreator";

const CookieConsentBanner = () => {
  const { isValid: isPrivacyPolicyValid, url: privacyPolicyUrl } =
    useLinkCreator({ path: pages.privacyPolicy });

  return (
    <>
      {isPrivacyPolicyValid && (
        <CookieConsent
          buttonText="I understand"
          cookieName="redux-strings"
          disableStyles
        >
          This website uses cookies to enhance the user experience.{" "}
          <a
            className="cookie-consent-link"
            href={privacyPolicyUrl}
            target="_blank"
            rel="noreferrer"
          >
            learn more
          </a>
        </CookieConsent>
      )}
    </>
  );
};

export default CookieConsentBanner;
