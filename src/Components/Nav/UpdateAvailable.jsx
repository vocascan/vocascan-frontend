import React, { useEffect, useState } from "react";

import GetAppIcon from "@material-ui/icons/GetApp";

import { nodeRequire } from "../../utils/index.js";

import "./UpdateAvailable.scss";

const { ipcRenderer } = nodeRequire("electron");

const UpdateAvailable = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleUpdateNotification = (_event, isDarwin, info) => {
      console.log(isDarwin, info);
      setShow(true);
    };

    ipcRenderer.on("update-available", handleUpdateNotification);

    return () => {
      ipcRenderer.removeListener("update-available", handleUpdateNotification);
    };
  });

  const handleUpdate = () => {
    ipcRenderer.send("start-update");
  };

  if (!show) {
    return null;
  }

  return <GetAppIcon onClick={handleUpdate} className="update-button" />;
};

export default UpdateAvailable;
