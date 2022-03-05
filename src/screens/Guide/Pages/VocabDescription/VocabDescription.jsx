import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import image1 from "./addVocab.png";

const VocabDescription = ({ setCanContinue }) => {
  const { t } = useTranslation();

  const bulletPoints = t("screens.guide.vocabDescription.bulletPoints", {
    returnObjects: true,
  });

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-1/3 flex flex-col my-auto mx-0">
        <img src={image1} alt="" />
      </div>
      <div className="my-[10%] mx-0 flex justify-between flex-col">
        <h1 className="text-2xl font-bold">{t("global.vocabs")}</h1>
        <p>{t("screens.guide.vocabDescription.heading")}</p>
        <ul className="py-0 px-[5%]">
          {bulletPoints.map((bulletPoint, index) => (
            <li className="text-xl text-left my-3 mx-24" key={index}>
              {bulletPoint}
            </li>
          ))}
        </ul>
        <p className="text-xl">{t("screens.guide.vocabDescription.endText")}</p>
      </div>
    </div>
  );
};

export default VocabDescription;
