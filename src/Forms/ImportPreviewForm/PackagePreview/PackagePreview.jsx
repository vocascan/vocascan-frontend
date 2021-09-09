import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Button from "../../../Components/Button/Button.jsx";
import Details from "../../../Components/Details/Details.jsx";
import Select, {
  SelectOptionWithFlag,
} from "../../../Components/Form/Select/Select.jsx";
import Switch from "../../../Components/Form/Switch/Switch.jsx";
import TextInput from "../../../Components/Form/TextInput/TextInput.jsx";
import Table from "../../../Components/Table/Table.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { importLanguagePackage } from "../../../utils/api.js";
import { findLanguageByCode, getLanguageString } from "../../../utils/index.js";

import "./PackagePreview.scss";

const PackagePreview = ({ importedData }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const languages = useSelector((state) => state.language.languages);

  const [languagePackage, setLanguagePackage] = useState(importedData);
  const [importQueryStatus, setImportQueryStatus] = useState(false);
  const [activateVocabs, setActivateVocabs] = useState(false);
  const [vocabsActive, setVocabsActive] = useState(true);

  const submitImport = () => {
    importLanguagePackage(
      languagePackage,
      true,
      activateVocabs,
      importQueryStatus
    )
      .then((response) => {
        showSnack("success", t("screens.allPackages.exportSuccessMessage"));
      })
      .catch((e) => {
        showSnack("error", t("screens.allPackages.exportFailMessage"));
      });
  };

  const selectOptions = useMemo(
    () =>
      languages.map((language) => ({
        value: getLanguageString(language),
        code: language.code,
        label: (
          <SelectOptionWithFlag
            name={getLanguageString(language)}
            foreignLanguageCode={language.code}
          />
        ),
      })),
    [languages]
  );

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allVocabs.vocabulary"),
        accessor: "name",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>{row.original.name}</div>
        ),
      },
      {
        Header: t("screens.allVocabs.description"),
        accessor: "description",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>{row.original.description}</div>
        ),
      },
      {
        Header: t("screens.allVocabs.translations"),
        accessor: "translations",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            {row.original.Translations.map((el) => el.name).join(", ")}
          </div>
        ),
      },
      {
        Header: t("screens.allGroups.active"),
        accessor: "active",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            {<CheckCircleIcon className="text-success" />}
          </div>
        ),
      },
    ],
    [t]
  );

  return (
    <div className="package-preview">
      <div className="update-fields">
        <TextInput
          autoFocus
          required
          placeholder={t("global.name")}
          onChange={(value) => {
            setLanguagePackage((prevState) => ({
              ...prevState,
              name: value,
            }));
          }}
          value={languagePackage.name}
          maxLength={255}
        />
        <div className="dropdown">
          <div className="select-wrapper">
            <Select
              required
              label={t("components.packageForm.foreignLanguage")}
              options={selectOptions}
              onChange={(value) => {
                setLanguagePackage((prevState) => ({
                  ...prevState,
                  foreignWordLanguage: value.code,
                }));
              }}
              value={{
                value: languagePackage.foreignWordLanguage,
                code: languagePackage.foreignWordLanguage,
                label: (
                  <SelectOptionWithFlag
                    name={getLanguageString(
                      findLanguageByCode(
                        languagePackage.foreignWordLanguage,
                        languages
                      )
                    )}
                    foreignLanguageCode={languagePackage.foreignWordLanguage}
                  />
                ),
              }}
            />
          </div>
          <div className="select-wrapper">
            <Select
              required
              label={t("components.packageForm.translatedLanguage")}
              options={selectOptions}
              onChange={(value) => {
                setLanguagePackage((prevState) => ({
                  ...prevState,
                  translatedWordLanguage: value.code,
                }));
              }}
              value={{
                value: languagePackage.translatedWordLanguage,
                code: languagePackage.translatedWordLanguage,
                label: (
                  <SelectOptionWithFlag
                    name={getLanguageString(
                      findLanguageByCode(
                        languagePackage.translatedWordLanguage,
                        languages
                      )
                    )}
                    foreignLanguageCode={languagePackage.translatedWordLanguage}
                  />
                ),
              }}
            />
          </div>
        </div>
        <TextInput
          autoFocus
          required
          placeholder={t("global.vocabsPerDay")}
          onChange={(value) => {
            setLanguagePackage((prevState) => ({
              ...prevState,
              vocabsPerDay: value,
            }));
          }}
          value={languagePackage.vocabsPerDay}
          max={255}
          min={0}
        />
        <TextInput
          autoFocus
          required
          placeholder={t("global.rightWords")}
          onChange={(value) => {
            setLanguagePackage((prevState) => ({
              ...prevState,
              rightWords: value,
            }));
          }}
          value={languagePackage.rightWords}
          max={10}
          min={1}
        />
        <Switch
          switcher
          optionRight={t("components.packagePreviewForm.vocabsActive")}
          onChange={() => setVocabsActive((prevCheck) => !prevCheck)}
          checked={vocabsActive}
        />
        <Switch
          switcher
          optionRight={t("components.packagePreviewForm.activateVocabs")}
          onChange={() => setActivateVocabs((prevCheck) => !prevCheck)}
          checked={activateVocabs}
          disabled={importQueryStatus}
        />
        {importedData.Drawers && (
          <Switch
            switcher
            optionRight={t("components.packagePreviewForm.importQueryStatus")}
            onChange={() => setImportQueryStatus((prevCheck) => !prevCheck)}
            checked={importQueryStatus}
          />
        )}
        <Details
          summary={t("global.groups")}
          count={languagePackage.Groups.length}
          open={false}
          key={1}
        >
          {languagePackage?.Groups.map((group, i) => (
            <Details
              className="group-preview"
              summary={group.name}
              count={group.length}
              open={i === 0}
              key={i}
            >
              <Table
                pagination={false}
                columns={columns}
                data={group.VocabularyCards}
              />
            </Details>
          ))}
        </Details>
      </div>
      <div className="submit-btn">
        <Button block uppercase onClick={submitImport} disabled={!importedData}>
          {t("global.import")}
        </Button>
      </div>
    </div>
  );
};

export default PackagePreview;
