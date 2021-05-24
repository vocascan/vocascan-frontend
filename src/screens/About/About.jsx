import React from "react";
import { useTranslation } from "react-i18next";

import "./About.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div>
        <h1>{t("screens.about.title")}</h1>
      </div>
    </div>
  );
};

export default About;
