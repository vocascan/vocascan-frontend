import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../../Button/Button.jsx";
import Flag from "../../Flag/Flag.jsx";
import LanguageSelector from "../../LanguageSelector/LanguageSelector.jsx";
import Modal from "../../Modal/Modal.jsx";

import "./UnauthenticatedLayout.scss";

const UnauthenticatedLayout = ({ children }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.setting.language);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <div className={`unauthenticated-container`}>
      <div
        onClick={() => setShowLanguageModal(true)}
        className="language-selector-wrapper"
      >
        <Flag languageCode={language} />
      </div>
      {children}
      <Modal
        open={showLanguageModal}
        title={t("modal.selectLanguage.title")}
        size="small"
        onClose={() => setShowLanguageModal(false)}
      >
        <div className="select-language-modal-inner">
          <LanguageSelector />
        </div>

        <div className="select-language-modal-close">
          <Button onClick={() => setShowLanguageModal(false)}>
            {t("global.close")}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UnauthenticatedLayout;
