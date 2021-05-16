import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { scaleValue } from "../../utils/index.js";

import "./Congratulation.scss";

const Congratulation = ({ percentage }) => {
  const { t } = useTranslation();
  const [congratulation, setCongratulations] = useState();

  const translations = t("screens.endScreen.congratulations", {
    returnObjects: true,
  });

  useEffect(() => {
    //get size of congratulation array and calculate the message with the given percentage
    setCongratulations(
      translations[
        scaleValue(percentage, [0, 100], [1, translations.length - 1])
      ]
    );
  }, [percentage, t, translations]);
  return <p className="congratulation">{congratulation}</p>;
};

export default Congratulation;
