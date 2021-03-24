import React from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import BarChartIcon from "@material-ui/icons/BarChart";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";

import NavButton from "./NavButton.jsx";

import "./Nav.scss";

function Nav() {
  const { t } = useTranslation();
  return (
    <div className="nav">
      <ul className="button-list">
        <NavButton name={t("nav.newVocab")} icon={<AddIcon />} link="/addVocab" />
        <NavButton name={t("nav.learn")} icon={<LocalLibraryIcon />} link="#" />
        <NavButton name={t("nav.progress")} icon={<BarChartIcon />} link="#" />
        <NavButton name={t("nav.allVocabulary")} icon={<LibraryBooksIcon />} link="#" />
        <NavButton name={t("nav.groupLearning")} icon={<GroupIcon />} link="#" />
      </ul>

      <div>
        <NavButton name={t("nav.settings")} icon={<SettingsIcon />} link="#" />
      </div>
    </div>
  );
}

export default Nav;
