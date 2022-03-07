import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

import Flag from "../Flag/Flag.jsx";

import { findLanguageByCode, getLanguageString } from "../../utils/index.js";

const DirectionBox = ({
  direction = "default",
  foreignWordLanguage,
  translatedWordLanguage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const languages = useSelector((state) => state.language.languages);

  const submitDirection = () => {
    history.push(`/learn/query/${direction}`);
  };

  return (
    <div
      className="w-11/12 min-h-[250px] rounded-xl text-mainText-inverse bg-background-inverse flex justify-center items-center m-2.5 hover:cursor-pointer hover:drop-shadow-[0_0px_10px_#4c51ec] hover:ease-in-out hover:duration-200 md:max-w-xl md:min-w-[350px] md:max-h-[600px]"
      onClick={submitDirection}
    >
      <div className="w-11/12 flex flex-col justify-around items-center ease-in-out duration-200">
        <div className="mt-12 flex items-center justify-between mx-1">
          {direction === "random" ? (
            <>
              <Flag languageCode={foreignWordLanguage} size="large" />
              <SyncAltIcon className="text-base md:text-3xl" />
              <Flag languageCode={translatedWordLanguage} size="large" />
            </>
          ) : direction === "backwards" ? (
            <>
              <Flag languageCode={translatedWordLanguage} size="large" />
              <ArrowRightAltIcon className="text-base md:text-3xl" />
              <Flag languageCode={foreignWordLanguage} size="large" />
            </>
          ) : (
            <>
              <Flag languageCode={foreignWordLanguage} size="large" />
              <ArrowRightAltIcon className="text-base md:text-3xl" />
              <Flag languageCode={translatedWordLanguage} size="large" />
            </>
          )}
        </div>
        <div className="mt-8 mb-8 uppercase tracking-[0.125em] text-sm">
          {direction === "random"
            ? t("global.random")
            : direction === "backwards"
            ? `${getLanguageString(
                findLanguageByCode(translatedWordLanguage, languages)
              )} - ${getLanguageString(
                findLanguageByCode(foreignWordLanguage, languages)
              )}`
            : `${getLanguageString(
                findLanguageByCode(foreignWordLanguage, languages)
              )} - ${getLanguageString(
                findLanguageByCode(translatedWordLanguage, languages)
              )}`}
        </div>
      </div>
    </div>
  );
};

export default DirectionBox;
