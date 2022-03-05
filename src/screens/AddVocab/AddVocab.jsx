import React from "react";
import { useTranslation } from "react-i18next";

import VocabForm from "../../Forms/VocabForm/VocabForm.jsx";

const AddVocab = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center">
      <VocabForm title={t("screens.addVocab.title")} />
    </div>
  );
};

export default AddVocab;
