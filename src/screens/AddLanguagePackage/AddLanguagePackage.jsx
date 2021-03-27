import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TextInput from "../../Components/TextInput/TextInput";
import Select from "../../Components/Select/Select";
import Button from "../../Components/Button/Button";

import { languages } from "../../utils/constants.js";

import "./AddLanguagePackage.scss";

const AddLanguagePackage = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [foreignLanguage, setForeignLanguage] = useState("");
  const [translatedLanguage, setTranslatedLanguage] = useState("");
  const [vocabsPerDay, setVocabsPerDay] = useState(100);
  const [rightTranslations, setRightTranslations] = useState(2);
  const jwtToken = useSelector((state) => state.login.user.jwt);
  const serverAddress = useSelector((state) => state.login.serverAddress);

  //make api call to add vocab package
  async function submitHandler() {
    //create the post request body
    let body = {
      name: name,
      foreignLanguage: foreignLanguage,
      translatedLanguage: translatedLanguage,
      vocabsPerDay: vocabsPerDay,
      rightTranslations: rightTranslations,
    };
    //create the config header file for request
    const config = {
      headers: {
        "Content-Type": "application/json",
        jwt: jwtToken,
      },
    };
    axios
      .post(serverAddress + "/api/createPackage", body, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log("jwt expired");
        }
      });
  }

  const selectOptions = languages.map((language) => {
    return {
      value: language.name,
      label: language.name,
    };
  });

  return (
    <div className="lngpckg">
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
            label={t("screens.addLanguagePackage.foreignLanguage")}
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
            label={t("screens.addLanguagePackage.translatedLanguage")}
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
        placeholder={t("screens.addLanguagePackage.vocabsPerDay")}
        onChange={(value) => {
          setVocabsPerDay(value);
        }}
        value={vocabsPerDay}
      />

      <TextInput
        required
        placeholder={t("screens.addLanguagePackage.correctTranslationsGoal")}
        onChange={(value) => {
          setRightTranslations(value);
        }}
        value={rightTranslations}
      />

      <Button onClick={submitHandler}>{t("global.submit")}</Button>
    </div>
  );
};

export default AddLanguagePackage;
