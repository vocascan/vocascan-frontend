import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import AddLanguagePackage from "screens/AddLanguagePackage/AddLanguagePackage";
import Modal from "Components/Modal/Modal";
import "./FirstStartup.scss";

const FirstStartup = () => {
  const { t } = useTranslation();
  const isFirstLogin = useSelector((state) => state.login.firstLogin);
  const [show, setShow] = useState(isFirstLogin);

  if (!isFirstLogin) {
    return null;
  }

  return (
    <Modal
      title={t("screens.firstStartup.title")}
      open={show}
      onClose={() => setShow(false)}
      renderClose={false}
      closeOnClickOutside={false}
    >
      <AddLanguagePackage />
    </Modal>
  );
};

export default FirstStartup;
