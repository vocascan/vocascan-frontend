import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../../Button/Button.jsx";
import LanguageSelector from "../../LanguageSelector/LanguageSelector.jsx";
import Modal from "../../Modal/Modal.jsx";

import useCountryFlag from "../../../hooks/useCountryFlag.js";

import "./UnauthenticatedLayout.scss";

const UnauthenticatedLayout = ({ children }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.setting.language);
  const { getCountryFlagByCode } = useCountryFlag();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <div className={`unauthenicated-container`}>
      <div
        onClick={() => setShowLanguageModal(true)}
        className="language-selector-wrapper"
      >
        {getCountryFlagByCode(language)}
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
