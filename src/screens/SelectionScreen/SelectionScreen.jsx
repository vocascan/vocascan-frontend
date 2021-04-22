import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";
import SelectionBox from "../../Components/SelectionBox/SelectionBox.jsx";

import { setSelfHosted } from "../../redux/Actions/login.js";

import Image from "../../images/logo/vocascan-server-logo-small.png";

import "./SelectionScreen.scss";

const SelectionScreen = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (selfHosted) => {
      dispatch(setSelfHosted({ selfHosted }));
    },
    [dispatch]
  );

  return (
    <UnauthenticatedLayout>
      <div className="select-srn-wrapper">
        <div className="select-srn-header-wrapper">
          <h1 className="select-srn-title">
            {t("screens.selectionScreen.title")}
          </h1>
          <h1 className="select-srn-heading">
            {t("screens.selectionScreen.heading")}
          </h1>
        </div>
        <div className="boxes">
          <SelectionBox
            heading={t("screens.selectionScreen.vocascanCloud.heading")}
            pro={t("screens.selectionScreen.vocascanCloud.pro", {
              returnObjects: true,
            })}
            contra={t("screens.selectionScreen.vocascanCloud.contra", {
              returnObjects: true,
            })}
            buttonText={t("screens.selectionScreen.vocascanCloud.button")}
            image={Image}
            onSubmit={() => handleSubmit(false)}
          />
          <SelectionBox
            heading={t("screens.selectionScreen.vocascanServer.heading")}
            pro={t("screens.selectionScreen.vocascanServer.pro", {
              returnObjects: true,
            })}
            contra={t("screens.selectionScreen.vocascanServer.contra", {
              returnObjects: true,
            })}
            buttonText={t("screens.selectionScreen.vocascanServer.button")}
            image={Image}
            onSubmit={() => handleSubmit(true)}
          />
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default SelectionScreen;
