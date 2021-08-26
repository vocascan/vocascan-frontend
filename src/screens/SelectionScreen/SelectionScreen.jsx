import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";
import SelectionBox from "../../Components/SelectionBox/SelectionBox.jsx";

import { setSelfHosted } from "../../redux/Actions/login.js";

import vocascanRound from "../../images/logo/color-round.svg";
import vocascanCloud from "../../images/logo/vocascan-cloud.svg";

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
            image={vocascanCloud}
            important
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
            image={vocascanRound}
            onSubmit={() => handleSubmit(true)}
          />
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default SelectionScreen;
