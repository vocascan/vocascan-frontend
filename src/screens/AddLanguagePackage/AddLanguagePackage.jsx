import React, { useState } from "react";
import axios from "axios";
import { languages } from "../../utils/constants.js";
import { useSelector } from "react-redux";
import "./AddLanguagePackage.scss";

import TextInput from "../../Components/TextInput/TextInput";
import Select from "../../Components/Select/Select";
import Button from "../../Components/Button/Button";

const AddLanguagePackage = () => {
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
        placeholder="Name"
        onChange={(value) => {
          setName(value);
        }}
      />

      <div className="dropdown">
        <div class="select-wrapper">
          <Select
            required
            value={foreignLanguage}
            label="Foreign language"
            options={selectOptions}
            onChange={(value) => {
              setForeignLanguage(value);
            }}
          />
        </div>
        <div class="select-wrapper">
          <Select
            required
            value={translatedLanguage}
            label="Translated language"
            options={selectOptions}
            onChange={(value) => {
              setTranslatedLanguage(value);
            }}
          />
        </div>
      </div>

      <TextInput
        required
        placeholder="Vocabs per day"
        onChange={(value) => {
          setVocabsPerDay(value);
        }}
      />

      <TextInput
        required
        placeholder="Correct translations to have successful vocabulary pairs"
        onChange={(value) => {
          setRightTranslations(value);
        }}
      />

      <Button onClick={submitHandler}>Weiter</Button>
    </div>
  );
};

export default AddLanguagePackage;
