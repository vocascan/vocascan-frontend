import React from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton.jsx";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import "./Nav.scss";

function Nav() {
  const { t, i18n } = useTranslation();
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

      <Link to="#" style={{ outline: 0 }}>
        <Button className="settings">
          <h5 className="settings-text">{t("nav.settings")}</h5>
        </Button>
      </Link>
    </div>
  );
}

export default Nav;
