import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
  const menuStyle = useSelector((state) => state.setting.menuStyle) || "default";

  return (
    <div className={`nav nav-${menuStyle}`}>
      <ul className="button-list">
        <NavButton name={t("nav.newVocab")} design={menuStyle} icon={<AddIcon />} link="/addVocab" />
        <NavButton name={t("nav.learn")} design={menuStyle} icon={<LocalLibraryIcon />} link="#" />
        <NavButton name={t("nav.progress")} design={menuStyle} icon={<BarChartIcon />} link="#" />
        <NavButton name={t("nav.allVocabulary")} design={menuStyle} icon={<LibraryBooksIcon />} link="#" />
        <NavButton name={t("nav.groupLearning")} design={menuStyle} icon={<GroupIcon />} link="#" />
      </ul>

      <div>
        <NavButton name={t("nav.settings")} design={menuStyle} icon={<SettingsIcon />} link="#" />
      </div>
    </div>
  );
}

export default Nav;
