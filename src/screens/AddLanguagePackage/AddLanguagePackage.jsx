import React, { useState } from "react";
import axios from "axios";
import { languages } from "../../utils/constants.js";
import { useSelector } from "react-redux";
import "./AddLanguagePackage.scss";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

import TextInput from "../../Components/TextInput/TextInput";
import Button from "../../Components/Button/Button";

function AddLanguagePackage(props) {
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

  //create language dropdown items
  const languageDropdownItems = languages.map((p) => (
    <MenuItem key={p.id} value={p.name}>
      {p.name}
    </MenuItem>
  ));

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
        <FormControl required variant="outlined" className="field">
          <InputLabel id="demo-simple-select-outlined-label">Foreign language</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={foreignLanguage}
            onChange={(e) => {
              setForeignLanguage(e.target.value);
            }}
            label="Group"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {languageDropdownItems}
          </Select>
        </FormControl>
        <FormControl required variant="outlined" className="field">
          <InputLabel id="demo-simple-select-outlined-label">Translated language</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={translatedLanguage}
            onChange={(e) => {
              setTranslatedLanguage(e.target.value);
            }}
            label="Group"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {languageDropdownItems}
          </Select>
        </FormControl>
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
}

export default AddLanguagePackage;
