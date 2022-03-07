import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import DirectionBox from "../../../Components/DirectionBox/DirectionBox.jsx";

const Direction = () => {
  const { t } = useTranslation();

  const foreignWordLanguage = useSelector(
    (state) => state.query.foreignWordLanguage
  );
  const translatedWordLanguage = useSelector(
    (state) => state.query.translatedWordLanguage
  );
  return (
    <div className="h-full grid grid-rows-[0.5fr_4fr] md:grid-rows-[1fr_3fr_1fr]">
      <h1 className="flex justify-center justify-self-center text-base self-end md:my-12 md:mx-0 md:text-2xl">
        {t("screens.direction.title")}
      </h1>
      <div className="flex flex-col justify-around items-center m-auto md:flex-row">
        <DirectionBox
          foreignWordLanguage={foreignWordLanguage}
          translatedWordLanguage={translatedWordLanguage}
        />
        <DirectionBox
          direction="backwards"
          foreignWordLanguage={foreignWordLanguage}
          translatedWordLanguage={translatedWordLanguage}
        />
        <DirectionBox
          direction="random"
          foreignWordLanguage={foreignWordLanguage}
          translatedWordLanguage={translatedWordLanguage}
        />
      </div>
    </div>
  );
};

export default Direction;
