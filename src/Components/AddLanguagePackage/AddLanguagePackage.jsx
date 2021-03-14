import React, { useState } from 'react';
import InputField from '../Others/InputField/InputField.jsx';
import axios from 'axios';
import languages from './Languages.js';
import { useSelector } from "react-redux";
import './AddLanguagePackage.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Dropdown, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    lngpckg: {
        width: "100%",
        height: "75%",
        display: "flex",
        background: theme.palette.primaryColour.main,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    dropdown: {
        display: "grid",
        gridTemplateColumns: "50% 50%",
        gridTemplateRows: "100px",
    }
}));


function AddLanguagePackage(props) {

    const classes = useStyles();

    const [name, setName] = useState('');
    const [foreignLanguage, setForeignLanguage] = useState('');
    const [translatedLanguage, setTranslatedLanguage] = useState('');
    const [vocabsPerDay, setVocabsPerDay] = useState(100);
    const [rightTranslations, setRightTranslations] = useState(2);
    const jwtToken = useSelector(state => state.login.user.jwt);
    const serverAddress = useSelector(state => state.login.serverAddress);

    //make api call to add vocab package
    async function submitHandler() {
        //create the post request body
        let body = {
            "name": name,
            "foreignLanguage": foreignLanguage,
            "translatedLanguage": translatedLanguage,
            "vocabsPerDay": vocabsPerDay,
            "rightTranslations": rightTranslations
        }
        //create the config header file for request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'jwt': jwtToken
            }
        }
        axios.post(serverAddress + '/api/createPackage', body, config)
            .then(response => {
                console.log(response.data)
            })
            .catch(function (error) {
                if (error.response.status == 401) {
                    console.log("jwt expired")
                }
            })
    }

    //create language dropdown items
    const languageDropdownItems = languages.map((p) => (
        <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
    ))

    return (
        <Box className={classes.lngpckg}>
            <TextField required id="standard-basic" label="Name" onChange={e => { setName(e.target.value) }} />

            <Box className={classes.dropdown}>
                <FormControl required variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Foreign language</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={foreignLanguage}
                        onChange={(e) => { setForeignLanguage(e.target.value) }}
                        label="Group"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {languageDropdownItems}
                    </Select>
                </FormControl>
                <FormControl required variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Translated language</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={translatedLanguage}
                        onChange={(e) => { setTranslatedLanguage(e.target.value) }}
                        label="Group"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {languageDropdownItems}
                    </Select>
                </FormControl>
            </Box>

            <TextField required id="standard-basic" label="Vocabs per day" onChange={e => setVocabsPerDay(e.target.value)} />

            <TextField required id="standard-basic" label="Correct translations to have successful vocabulary pairs" onChange={e => setRightTranslations(e.target.value)} />

            <button className="lngpckg-submitBtn" type="button" value="Submit" onClick={submitHandler}>Weiter</button>
        </Box >
    );
}

export default AddLanguagePackage;