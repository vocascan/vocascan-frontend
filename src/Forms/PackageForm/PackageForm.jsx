import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Select, {
  SelectOptionWithFlag,
} from "../../Components/Form/Select/Select.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";

import useSnack from "../../hooks/useSnack.js";
import { createPackage, modifyPackage } from "../../utils/api.js";
import { languages } from "../../utils/constants.js";

import "./PackageForm.scss";

const PackageForm = ({ defaultData = null, onSubmitCallback = null }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [name, setName] = useState(defaultData ? defaultData.name : "");
  const [foreignLanguage, setForeignLanguage] = useState(
    defaultData
      ? {
          value: defaultData.foreignWordLanguage,
          label: (
            <SelectOptionWithFlag
              name={defaultData.foreignWordLanguage}
              foreignLanguageCode={defaultData.foreignWordLanguage}
            />
          ),
        }
      : ""
  );
  const [translatedLanguage, setTranslatedLanguage] = useState(
    defaultData
      ? {
          value: defaultData.translatedWordLanguage,
          label: (
            <SelectOptionWithFlag
              name={defaultData.translatedWordLanguage}
              foreignLanguageCode={defaultData.translatedWordLanguage}
            />
          ),
        }
      : ""
  );
  const [vocabsPerDay, setVocabsPerDay] = useState(
    defaultData ? defaultData.vocabsPerDay : 100
  );
  const [rightTranslations, setRightTranslations] = useState(
    defaultData ? defaultData.rightWords : 2
  );
  const [canSubmit, setCanSubmit] = useState(false);

  //make api call to add vocab package
  const submitHandler = useCallback(async () => {
    const packageToSave = {
      name: name,
      foreignWordLanguage: foreignLanguage.value,
      translatedWordLanguage: translatedLanguage.value,
      vocabsPerDay: vocabsPerDay,
      rightWords: rightTranslations,
    };

    if (defaultData?.id) {
      packageToSave.id = defaultData.id;

      modifyPackage(packageToSave)
        .then(({ data }) => {
          onSubmitCallback && onSubmitCallback(data);
          showSnack(
            "success",
            t("components.packageForm.modifyPackageSuccessMessage")
          );
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            console.log("jwt expired");
            showSnack(
              "error",
              t("components.packageForm.modifyPackageFailedMessage")
            );
          }
        });

      return;
    }

    createPackage(packageToSave)
      .then(({ data }) => {
        onSubmitCallback && onSubmitCallback(data);
        showSnack(
          "success",
          t("components.packageForm.savePackageSuccessMessage")
        );
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          console.log("jwt expired");
        }
        showSnack(
          "success",
          t("components.packageForm.savePackageFailMessage")
        );
      });
  }, [
    defaultData?.id,
    foreignLanguage.value,
    name,
    onSubmitCallback,
    rightTranslations,
    showSnack,
    t,
    translatedLanguage.value,
    vocabsPerDay,
  ]);

  const selectOptions = languages.map((language) => {
    return {
      value: language.name,
      label: (
        <SelectOptionWithFlag
          name={language.name}
          foreignLanguageCode={language.countryCode}
        />
      ),
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
