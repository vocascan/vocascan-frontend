import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import GroupIcon from "@material-ui/icons/Group";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SettingsIcon from "@material-ui/icons/Settings";

import NavButton from "./NavButton.jsx";

import "./Nav.scss";

function Nav() {
  const { t } = useTranslation();
  const menuStyle = useSelector((state) => state.setting.menuStyle);
  const [initialStyle, setInitialStyle] = useState(menuStyle);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menuStyle === initialStyle) {
      return;
    }

    setLoading(true);
    setInitialStyle(menuStyle);
    let timer = setTimeout(() => setLoading(false), 400);

    return () => {
      clearTimeout(timer);
    };
    // initialStyle counts only for initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuStyle]);

  return (
    <div className={`nav nav-${menuStyle} ${loading ? "nav-loading" : ""}`}>
      <ul className="button-list">
        <NavButton
          name={t("nav.newVocab")}
          exact
          design={menuStyle}
          icon={<AddIcon />}
          link="/addVocab"
        />
        <NavButton
          name={t("nav.learn")}
          design={menuStyle}
          icon={<LocalLibraryIcon />}
          link="/learn"
        />
        <NavButton
          name={t("nav.progress")}
          design={menuStyle}
          icon={<BarChartIcon />}
          link="/progress"
        />
        <NavButton
          name={t("nav.allVocabulary")}
          design={menuStyle}
          icon={<LibraryBooksIcon />}
          link="/allVocabulary"
        />
        <NavButton
          name={t("nav.groupLearning")}
          design={menuStyle}
          icon={<GroupIcon />}
          link="/groupLearning"
        />
      </ul>

      <div>
        <NavButton
          name={t("nav.settings")}
          design={menuStyle}
          icon={<SettingsIcon />}
          link="/settings"
        />
      </div>
    </div>
  );
}

export default Nav;
