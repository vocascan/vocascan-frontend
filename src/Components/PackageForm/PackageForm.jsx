import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button.jsx";
import Select from "../Select/Select.jsx";
import TextInput from "../TextInput/TextInput.jsx";

import { createPackage } from "../../utils/api.js";
import { languages } from "../../utils/constants.js";

import "./PackageForm.scss";

const PackageForm = ({ onSubmitCallback = null }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [foreignLanguage, setForeignLanguage] = useState("");
  const [translatedLanguage, setTranslatedLanguage] = useState("");
  const [vocabsPerDay, setVocabsPerDay] = useState(100);
  const [rightTranslations, setRightTranslations] = useState(2);
  const [canSubmit, setCanSubmit] = useState(false);

  //make api call to add vocab package
  async function submitHandler() {
    const newPackage = {
      name: name,
      foreignWordLanguage: foreignLanguage.value,
      translatedWordLanguage: translatedLanguage.value,
      vocabsPerDay: vocabsPerDay,
      rightWords: rightTranslations,
    };

    createPackage(newPackage)
      .then(({ data }) => {
        onSubmitCallback && onSubmitCallback(data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          console.log("jwt expired");
        }
      });
  }

  const selectOptions = languages.map((language) => {
    return {
      value: language.name,
      label: language.icon + " " + language.name,
    };
  });

  useEffect(() => {
    setCanSubmit(
      !(
        !name ||
        !foreignLanguage ||
        !translatedLanguage ||
        !vocabsPerDay ||
        !rightTranslations
      )
    );
  }, [
    foreignLanguage,
    name,
    rightTranslations,
    translatedLanguage,
    vocabsPerDay,
  ]);

  return (
    <div className="language-package-form">
      <div className="form-wrapper">
        <TextInput
          required
          placeholder={t("global.name")}
          onChange={(value) => {
            setName(value);
          }}
          value={name}
        />

        <div className="dropdown">
          <div className="select-wrapper">
            <Select
              required
              label={t("components.packageForm.foreignLanguage")}
              options={selectOptions}
              onChange={(value) => {
                setForeignLanguage(value);
              }}
              value={foreignLanguage}
            />
          </div>
          <div className="select-wrapper">
            <Select
              required
              label={t("components.packageForm.translatedLanguage")}
              options={selectOptions}
              onChange={(value) => {
                setTranslatedLanguage(value);
              }}
              value={translatedLanguage}
            />
          </div>
        </div>

        <TextInput
          required
          placeholder={t("components.packageForm.vocabsPerDay")}
          onChange={(value) => {
            setVocabsPerDay(value);
          }}
          value={vocabsPerDay}
          type="number"
        />

        <TextInput
          required
          placeholder={t("components.packageForm.correctTranslationsGoal")}
          onChange={(value) => {
            setRightTranslations(value);
          }}
          value={rightTranslations}
          type="number"
        />
      </div>

      <Button disabled={!canSubmit} onClick={submitHandler}>
        {t("global.submit")}
      </Button>
    </div>
  );
};

export default PackageForm;
