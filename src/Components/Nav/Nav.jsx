import React from "react";
import NavButton from "./NavButton.jsx";
import { useTranslation } from "react-i18next";
import "./Nav.scss";

function Nav() {
  const { t } = useTranslation();
  return (
    <div className="nav">
      <div className="title">
        <h1 className="text">Vocascan</h1>
      </div>
      <ul className="button-list">
        <NavButton name={t("nav.newVocab")} link="/addVocab" />
        <NavButton name={t("nav.learn")} link="#" />
        <NavButton name={t("nav.progress")} link="#" />
        <NavButton name={t("nav.allVocabulary")} link="#" />
        <NavButton name={t("nav.groupLearning")} link="#" />
      </ul>

      <div>
        <NavButton name={t("nav.settings")} link="#" />
      </div>
    </div>
  );
}

export default Nav;
