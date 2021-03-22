import React from "react";
import { useSelector } from "react-redux";

import AddLanguagePackage from "../AddLanguagePackage/AddLanguagePackage.jsx";
import "./FirstStartup.scss";

function FirstStartup(props) {
  const isFirstLogin = useSelector((state) => state.login.firstLogin);

  if (!isFirstLogin) {
    return null;
  }

  return (
    <div className="first-startup-visible">
      <div className="first-startup-inner">
        <h1 className="first-startup-inner-heading">CREATE YOUR FIRST VOCABULARY PACKAGE</h1>
        <AddLanguagePackage />
      </div>
    </div>
  );
}

export default FirstStartup;
