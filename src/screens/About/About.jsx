import React from "react";
import { useTranslation } from "react-i18next";

import Card from "../../Components/Card/Card.jsx";

import "./About.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div>
        <h1>{t("screens.about.title")}</h1>
        <div className="cardWrapper">
          <Card name="noctera" date="25.11.2020" />
          <Card name="zikowang" date="16.03.2020" />
          <Card name="luwol03" date="17.03.2020" />
        </div>
      </div>
    </div>
  );
};

export default About;
