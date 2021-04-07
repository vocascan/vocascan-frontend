import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Modal from "../../Components/Modal/Modal.jsx";
import PackageForm from "../../Components/PackageForm/PackageForm.jsx";

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
    >
      <PackageForm />
    </Modal>
  );
};

export default FirstStartup;
