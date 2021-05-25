import React from "react";
import { useTranslation } from "react-i18next";

import VocabForm from "../../Forms/VocabForm/VocabForm.jsx";

import "./AddVocab.scss";

const AddVocab = () => {
  const { t } = useTranslation();

  return (
    <div>
      <VocabForm title={t("screens.addVocab.title")} />
    </div>
  );
};

export default AddVocab;
