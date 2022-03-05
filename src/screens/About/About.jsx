import React from "react";
import { useTranslation } from "react-i18next";

import Card from "../../Components/ContributorCard/ContributorCard.jsx";
import Details from "../../Components/Details/Details.jsx";

import { contributors, additionalDependencies } from "../../utils/constants.js";

import packageInfo from "../../../package.json";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-11/12 flex flex-col py-10 px-0">
        <h1 className="mb-8">{t("screens.about.title")}</h1>

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
            Object.keys(packageInfo.dependencies).length +
            Object.keys(packageInfo.devDependencies).length +
            Object.keys(additionalDependencies).length
          }
        >
          {Object.entries({
            ...packageInfo.dependencies,
            ...packageInfo.devDependencies,
            ...additionalDependencies,
          }).map(([name, version], i) => (
            <a
              href={`https://www.npmjs.com/package/${name}`}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-background-inverse text-white p-3 m-2 rounded-lg no-underline ease-in-out duration-150 hover:bg-background-inverseHover"
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
