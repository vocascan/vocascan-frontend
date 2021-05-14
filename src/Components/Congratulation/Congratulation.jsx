import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { scaleValue } from "../../utils/index.js";

import "./Congratulation.scss";

const Congratulation = (percentage) => {
  const { t } = useTranslation();
  const [congratulation, setCongratulations] = useState();

  useEffect(() => {
    //get size of congratulation array and calculate the message with the given percentage
    const translations = t("screens.endScreen.congratulations", {
      returnObjects: true,
    });

    setCongratulations(
      translations[scaleValue(percentage, [0, 100], [0, translations.length])]
    );
  }, [percentage, t]);
  return <p className="congratulation">{congratulation}</p>;
};

export default Congratulation;
