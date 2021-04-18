import React from "react";
import { useTranslation } from "react-i18next";

import "./AddVocab.scss";

import VocabForm from "../../Forms/VocabForm/VocabForm";

const AddVocab = () => {
  const { t } = useTranslation();

  return (
    <div className="add-vocab-form">
      <VocabForm title={t("screens.addVocab.title")} />
    </div>
  );
};

export default AddVocab;
