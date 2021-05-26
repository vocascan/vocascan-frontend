import React from "react";
import { useTranslation } from "react-i18next";

import Card from "../../Components/ContributorCard/ContributorCard.jsx";
import Details from "../../Components/Details/Details.jsx";

import { contributors, additionalDependencies } from "../../utils/constants.js";

import { dependencies, devDependencies } from "../../../package.json";

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

        <Details
          summary={t("contributors.dependencies")}
          count={
            Object.keys(dependencies).length +
            Object.keys(devDependencies).length +
            Object.keys(additionalDependencies).length
          }
        >
          {Object.entries({
            ...dependencies,
            ...devDependencies,
            ...additionalDependencies,
          }).map(([name, version], i) => (
            <a
              href={`https://www.npmjs.com/package/${name}`}
              target="_blank"
              rel="noreferrer noopener"
              className="dependency-card"
              key={i}
            >
              {name}: {version}
            </a>
          ))}
        </Details>
      </div>
    </div>
  );
};

export default About;
