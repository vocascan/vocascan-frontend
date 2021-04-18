import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Modal from "../../Components/Modal/Modal.jsx";
import PackageForm from "../../Forms/PackageForm/PackageForm.jsx";
import useSnack from "../../hooks/useSnack.jsx";

import "./FirstStartup.scss";

const FirstStartup = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const isFirstLogin = useSelector((state) => state.login.firstLogin);
  const [show, setShow] = useState(isFirstLogin);

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
      <PackageForm onSubmitCallback={packageAdded} />
    </Modal>
  );
};

export default FirstStartup;
