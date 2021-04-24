import React from "react";
import { useSelector } from "react-redux";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

import { languages } from "../../utils/constants.js";

import "./DirectionBox.scss";

const DirectionBox = ({ direction = "default" }) => {
  const foreignWordLanguage = useSelector(
    (state) => state.learn.foreignWordLanguage
  );
  const translatedWordLanguage = useSelector(
    (state) => state.learn.translatedWordLanguage
  );

  return (
    <div className="direction-box">
      <div className="flags">
        {languages.find((ele) => ele.name === foreignWordLanguage)?.icon}
        {direction === "random" ? (
          <SyncAltIcon className="direction-arrow" />
        ) : direction === "backwards" ? (
          <ArrowRightAltIcon className="direction-arrow invert" />
        ) : (
          <ArrowRightAltIcon className="direction-arrow" />
        )}
        {languages.find((ele) => ele.name === translatedWordLanguage)?.icon}
      </div>
      <div className="languages">
        {foreignWordLanguage} - {translatedWordLanguage}{" "}
      </div>
    </div>
  );
};

export default DirectionBox;
