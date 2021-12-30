import React, { useEffect, useState } from "react";

import GetAppIcon from "@material-ui/icons/GetApp";

import { updateNotifier, startUpdate } from "../../modules/update.js";

import "./UpdateAvailable.scss";

const UpdateAvailable = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleUpdateNotification = (_event, isDarwin, info) => {
      console.log(isDarwin, info);
      setShow(true);
    };

    updateNotifier.on("update-available", handleUpdateNotification);

    return () => {
      updateNotifier.removeListener(
        "update-available",
        handleUpdateNotification
      );
    };
  });

  const handleUpdate = () => {
    startUpdate();
  };

  if (!show) {
    return null;
  }

  return <GetAppIcon onClick={handleUpdate} className="update-button" />;
};

export default UpdateAvailable;
