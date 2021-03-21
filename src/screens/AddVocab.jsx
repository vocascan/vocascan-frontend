import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Select, InputLabel, MenuItem, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  addVocabForm: {
    gridColumn: 2,
    gridRow: 2,
    margin: "auto",
    color: theme.palette.font.dark,
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "25% auto 25%",
    gridTemplateRows: "20% 40px 80px auto 40px 20%",
  },
  heading: {
    gridColumn: 2,
    gridRow: 2,
  },
  dropdowns: {
    width: "100%",
    height: "50px",
    gridColumn: 2,
    gridRow: 3,
    display: "flex",
    justifyContent: "space-between",
    zIndex: 4,
    margin: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "200px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputFields: {
    gridColumn: 2,
    gridRow: 4,
    display: "grid",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  submitBtn: {
    width: "150px",
    height: "35px",
    gridColumn: 2,
    gridRow: 5,
    background: theme.palette.action.main,
    boxShadow: "-1px 3px 5px " + theme.palette.shadow.main,
    margin: "0 auto",
  },
}));

function AddVocab(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [packages, setPackages] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [foreignWord, setForeignWord] = useState("");
  const [translations, setTranslations] = useState([]);
  const [description, setDescription] = useState("");
  const jwt = useSelector((state) => state.login.user.jwt);
  const serverAddress = useSelector((state) => state.login.serverAddress);

  useEffect(() => {
    getPackages();
  }, [jwt, serverAddress]);

  function refreshGroups() {
    //setGroups(vocascanModule.getGroups(packageName));
  }

  /*function submit() {
        vocascan.addVocab(packageName, groupName, foreignWord, translations, description);
    }*/

  function addGroup(value) {
    //vocascan.addGroup(value, packageName);
    refreshGroups();
    console.log(value);
    console.log(packageName);
  }

  const handleChange = (event) => {
    //setAge(event.target.value);
  };

  //make api call to get language packages
  function getPackages() {
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
  }

  //make api call to get group
  function getGroups(name) {
    console.log(name);
    axios({
      method: "GET",
      url: serverAddress + "/api/groups",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
      params: {
        languagePackage: name,
      },
    })
      .then((response) => {
        setGroups(response.data);
        console.log(response.data);
      })
      .catch(function (error) {});
  }

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
    <Box className={classes.addVocabForm}>
      <h1 className={classes.heading}>Add vocabulary</h1>

      <Box className={classes.dropdowns}>
        <FormControl required variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Package</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={packageName}
            onChange={/*(e) => { setPackageName(e.target.value), getGroups(e.target.value) }*/ console.log("changed")}
            label="Package"
          >
            <MenuItem value="">
              <em>{t("global.none")}</em>
            </MenuItem>
            {languagePackageDropdownItems}
          </Select>
        </FormControl>
        <FormControl required variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            label="Group"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {groupDropdownItems}
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.inputFields}>
        <TextField
          required
          id="standard-basic"
          label="Fremdwort"
          onChange={(e) => {
            setForeignWord(e.target.value);
          }}
        />
        <TextField
          required
          id="standard-basic"
          label="1. Übersetzung"
          onChange={(e) => {
            setTranslations(e.target.value);
          }}
        />
        <TextField
          required
          id="standard-basic"
          label="2. Übersetzung"
          onChange={(e) => {
            setTranslations(e.target.value);
          }}
        />
        <TextField
          required
          id="standard-basic"
          label="3. Übersetzung"
          onChange={(e) => {
            setTranslations(e.target.value);
          }}
        />
        <TextField
          required
          id="standard-basic"
          label="Beschreibung"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Box>

      <Button
        className={classes.submitBtn}
        onClick={() => {
          console.log("added");
        }}
      >
        {t("global.add")}
      </Button>
    </Box>
  );
}

export default AddVocab;
