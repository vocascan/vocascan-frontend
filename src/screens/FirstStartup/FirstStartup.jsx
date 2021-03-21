import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";

import AddLanguagePackage from "../AddLanguagePackage.jsx";
import "./FirstStartup.scss";

function FirstStartup(props) {
  const isFirstLogin = useSelector((state) => state.login.firstLogin);

  return (
    <Box className={isFirstLogin ? "firstStartup__visible" : "firstStartup__invisible"}>
      <Box className="firstStartup-inner">
        <h1 className="firstStartup-inner-heading">CREATE YOUR FIRST VOCABULARY PACKAGE</h1>
        <AddLanguagePackage />
      </Box>
    </Box>
  );
}

export default FirstStartup;
