import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import image1 from "./addGroup1.png";
import image2 from "./addGroup2.png";

const GroupDescription = ({ setCanContinue }) => {
  const { t } = useTranslation();

  const bulletPoints = t("screens.guide.groupDescription.bulletPoints", {
    returnObjects: true,
  });

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-1/3 flex flex-col my-[10%] mx-0">
        <img className="h-1/2 object-cover" src={image1} alt="" />
        <img className="h-1/2 object-cover" src={image2} alt="" />
      </div>
      <div className="my-[10%] mx-0 flex flex-col justify-between">
        <h1 className="text-2xl font-bold">{t("global.groups")}</h1>
        <ul className="py-0 px-[5%]">
          {bulletPoints.map((bulletPoint, index) => (
            <li className="text-xl text-left my-3 mx-24" key={index}>
              {bulletPoint}
            </li>
          ))}
        </ul>
        <p className="text-xl">{t("screens.guide.groupDescription.endText")}</p>
      </div>
    </div>
  );
};

export default GroupDescription;
