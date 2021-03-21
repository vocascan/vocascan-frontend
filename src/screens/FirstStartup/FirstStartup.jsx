import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";

import AddLanguagePackage from "../AddLanguagePackage.jsx";
import "./FirstStartup.scss";

function FirstStartup(props) {
  const isFirstLogin = useSelector((state) => state.login.firstLogin);

  return (
    <Box className={isFirstLogin ? "first-startup-visible" : "first-startup-invisible"}>
      <Box className="first-startup-inner">
        <h1 className="first-startup-inner-heading">CREATE YOUR FIRST VOCABULARY PACKAGE</h1>
        <AddLanguagePackage />
      </Box>
    </Box>
  );
}

export default FirstStartup;
