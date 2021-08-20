import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Button from "../../../Components/Button/Button.jsx";
import Details from "../../../Components/Details/Details.jsx";
import Select, {
  SelectOptionWithFlag,
} from "../../../Components/Form/Select/Select.jsx";
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

  const submitImport = () => {
    importLanguagePackage(languagePackage, true, false)
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
        Header: t("screens.allVocabs.vocabel"),
        accessor: "name",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.name}</p>
          </div>
        ),
      },
      {
        Header: t("screens.allVocabs.description"),
        accessor: "description",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.description}</p>
          </div>
        ),
      },
      {
        Header: t("screens.allVocabs.translations"),
        accessor: "translations",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.Translations.map((el) => el.name).join(", ")}</p>
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
      <TextInput
        autoFocus
        required
        placeholder={"Name"}
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
        placeholder={"Vocabs Per Day"}
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
        placeholder={"Right words"}
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
      <Details
        summary={"Groups"}
        count={languagePackage.Groups.length}
        open={false}
        key={1}
      >
        {languagePackage?.Groups.map((group, i) => (
          <Details
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

      {/*{Object.entries(languagePackage.Groups).map(([key, value], i) => (
        <Details
          summary={value.name}
          count={value.length}
          open={i === 0}
          key={i}
        >
          {value.map((contributor, j) => console.log("hello"))}
        </Details>
      ))}*/}
      <Button block uppercase onClick={submitImport}>
        {t("global.signIn")}
      </Button>
    </div>
  );
};

export default PackagePreview;
