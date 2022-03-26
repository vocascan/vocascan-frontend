import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../../Button/Button.jsx";
import Flag from "../../Flag/Flag.jsx";
import LanguageSelector from "../../LanguageSelector/LanguageSelector.jsx";
import Modal from "../../Modal/Modal.jsx";

const UnauthenticatedLayout = ({ children }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.setting.language);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <div className="w-full min-h-screen flex justify-center relative bg-gradient-to-r from-blue-400 to-pink-300">
      <div
        onClick={() => setShowLanguageModal(true)}
        className="absolute top-3 right-3 z-10"
      >
        <Flag languageCode={language} size="medium" hover />
      </div>
      {children}
      <Modal
        open={showLanguageModal}
        title={t("modal.selectLanguage.title")}
        size="small"
        onClose={() => setShowLanguageModal(false)}
      >
        <div className="self-center mx-0 mt-5 mb-8 w-64">
          <LanguageSelector />
        </div>

        <div className="self-center">
          <Button onClick={() => setShowLanguageModal(false)}>
            {t("global.close")}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UnauthenticatedLayout;
