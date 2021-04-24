import React from "react";
import { useSelector } from "react-redux";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { languages } from "../../utils/constants.js";

import "./DirectionBox.scss";

const DirectionBox = () => {
  const foreignWordLanguage = useSelector(
    (state) => state.learn.foreignWordLanguage
  );
  const translatedWordLanguage = useSelector(
    (state) => state.learn.translatedWordLanguage
  );

  return (
    <div className="direction-box">
      <h1 className="direction-box-heading">
        <div className="direction-box-flags">
          {languages.find((ele) => ele.name === foreignWordLanguage)?.icon}
          <ArrowForwardIcon />
          {languages.find((ele) => ele.name === translatedWordLanguage)?.icon}
        </div>
        {foreignWordLanguage} - {translatedWordLanguage}{" "}
      </h1>
    </div>
  );
};

export default DirectionBox;
