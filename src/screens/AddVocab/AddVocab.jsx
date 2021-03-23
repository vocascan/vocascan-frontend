import React, { useState, useEffect } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import "./AddVocab.scss";

const AddVocab = () => {
  const { t } = useTranslation();

  const [packages, setPackages] = useState([]);
  const [packageName] = useState("");
  const [groups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [foreignWord, setForeignWord] = useState("");
  const [, setTranslations] = useState([]);
  const [description, setDescription] = useState("");
  const jwt = useSelector((state) => state.login.user.jwt);
  const serverAddress = useSelector((state) => state.login.serverAddress);

  // default number of translation inputs to render
  const translationInputs = [1, 2, 3];

  useEffect(() => {
    axios({
      method: "GET",
      url: serverAddress + "/api/packages",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    })
      .then((response) => {
        setPackages(response.data);
        console.log(response.data);
      })
      .catch(function (error) {});
  }, [jwt, serverAddress]);

  // function refreshGroups() {
  //   setGroups(vocascanModule.getGroups(packageName));
  // }

  // function submit() {
  //   vocascan.addVocab(packageName, groupName, foreignWord, translations, description);
  // }

  // function addGroup(value) {
  //   vocascan.addGroup(value, packageName);
  //   refreshGroups();
  //   console.log(value);
  //   console.log(packageName);
  // }

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  //make api call to get group
  // function getGroups(name) {
  //   console.log(name);
  //   axios({
  //     method: "GET",
  //     url: serverAddress + "/api/groups",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${jwt}`,
  //     },
  //     params: {
  //       languagePackage: name,
  //     },
  //   })
  //     .then((response) => {
  //       setGroups(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {});
  // }

  //create dropdown items for language packages
  let languagePackageDropdownItems;
  //show if array of groups is 0, because .map is not working with empty array
  if (packages != null) {
    languagePackageDropdownItems = groups.map((p) => (
      <MenuItem key={p.id} value={p.name}>
        {p.name}
      </MenuItem>
    ));
  } else {
    languagePackageDropdownItems = <MenuItem value="">no language packages</MenuItem>;
  }

  //create dropdown items for groups
  let groupDropdownItems;
  //show if array of groups is 0, because .map is not working with empty array
  if (groups != null) {
    groupDropdownItems = groups.map((p) => (
      <MenuItem key={p.id} value={p.name}>
        {p.name}
      </MenuItem>
    ));
  } else {
    groupDropdownItems = <MenuItem value="">no groups</MenuItem>;
  }

  return (
    <div className="add-vocab-form">
      <h1 className="heading">{t("screens.addVocab.title")}</h1>

      <div className="dropdowns">
        <FormControl required variant="outlined" className="form-control">
          <InputLabel id="demo-simple-select-outlined-label">{t("global.package")}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={packageName}
            onChange={/*(e) => { setPackageName(e.target.value), getGroups(e.target.value) }*/ console.log("changed")}
            label={t("global.package")}
          >
            <MenuItem value="">
              <em>{t("global.none")}</em>
            </MenuItem>
            {languagePackageDropdownItems}
          </Select>
        </FormControl>
        <FormControl required variant="outlined" className="form-control">
          <InputLabel id="demo-simple-select-outlined-label">{t("global.group")}</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            label={t("global.group")}
          >
            <MenuItem value="">
              <em>{t("global.none")}</em>
            </MenuItem>

            {groupDropdownItems}
          </Select>
        </FormControl>
      </div>
      <div className="input-fields">
        <TextInput
          required
          placeholder={t("global.foreignWord")}
          onChange={(value) => {
            setForeignWord(value);
          }}
        />
        {translationInputs.map((elem, key) => (
          <TextInput
            required
            key={elem}
            placeholder={`${elem} ${t("global.translation")}`}
            onChange={(value) => {
              setTranslations((trans) => {
                trans[key] = value;

                return trans;
              });
            }}
          />
        ))}
        <TextInput
          required
          placeholder={t("global.description")}
          onChange={(value) => {
            setDescription(value);
          }}
        />
      </div>

      <div className="form-submit">
        <Button
          block
          onClick={() => console.log("added")}
          disabled={!(foreignWord && setTranslations.length && description && groupName.length && packageName)}
        >
          {t("global.add")}
        </Button>
      </div>
    </div>
  );
};

export default AddVocab;
