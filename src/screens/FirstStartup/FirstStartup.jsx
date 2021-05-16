import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Indicator from "../../Components/Indicators/PageIndicator/PageIndicator.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import GroupForm from "../../Forms/GroupForm/GroupForm.jsx";
import PackageForm from "../../Forms/PackageForm/PackageForm.jsx";
import VocabForm from "../../Forms/VocabForm/VocabForm.jsx";

import useSnack from "../../hooks/useSnack.js";

import "./FirstStartup.scss";

const FirstStartup = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const isFirstLogin = true; //useSelector((state) => state.login.firstLogin);
  const [show, setShow] = useState(isFirstLogin);

  const [index, setIndex] = useState(1);

  const pages = [<PackageForm />, <GroupForm />, <VocabForm />];

  const packageAdded = useCallback(() => {
    setShow(false);
    showSnack("success", t("screens.firstStartup.savePackageSuccessMessage"));
  }, [t, showSnack]);

  if (!isFirstLogin) {
    return null;
  }

  return (
    <Modal
      title={t("screens.firstStartup.title")}
      open={show}
      onClose={() => setShow(false)}
    >
      {pages[index]}
      <Indicator activeState={index} max={pages.length} />
    </Modal>
  );
};

export default FirstStartup;
