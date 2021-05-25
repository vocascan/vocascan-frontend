import React from "react";
import { useTranslation } from "react-i18next";

import Card from "../../Components/ContributorCard/ContributorCard.jsx";
import Details from "../../Components/Details/Details.jsx";

import { contributors } from "../../utils/constants.js";

import "./About.scss";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="wrapper">
        <h1>{t("screens.about.title")}</h1>

        {Object.entries(contributors).map(([key, value], i) => (
          <Details
            summary={t(`contributors.${key}`)}
            count={value.length}
            open={i === 0}
            key={i}
          >
            {value.map((contributor, j) => (
              <Card
                name={contributor.name}
                description={contributor.description}
                key={j}
              />
            ))}
          </Details>
        ))}
      </div>
    </div>
  );
};

export default About;
