import React, {useState} from 'react';
import InputField from '../Others/InputField/InputField.jsx';
import Dropdown from '../Others/Dropdown/Dropdown.jsx';
import languages from './Languages.js';
import { useSelector } from "react-redux";
import './AddLanguagePackage.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    lngpckg: {
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    dropdown: {
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 4,
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

    return (
        <Box className={classes.lngpckg}>
            <label>
                <h3>Name</h3>
                <InputField placeholder="z.B. Englisch - Deutsch" function={e => { setName(e.target.value)}}/>
            </label>

            <div className="lngpckg-dropdown">
                <label className="lngpckg-dropdown-field">
                    Foreign language
                    <Dropdown title="Auswählen..." function={e => setForeignLanguage(e.target.value)} selection={languages} addField={true} addFieldFunction={e => console.log(e.target.value)}/>
                </label>
                <label className="lngpckg-dropdown-field">
                    Translated language
                    <Dropdown title="Auswählen..." function={e => setTranslatedLanguage(e.target.value)} selection={languages} addField={true} addFieldFunction={e => console.log(e.target.value)}/>
                </label>
            </div>

            <label>
                <h3>Vocabs per day</h3>
                <InputField placeholder="z.B. 100" function={e => setVocabsPerDay(e.target.value)}/>
            </label>

            <label>
                <h3>Correct translations to have successful vocabulary pairs</h3>
                <InputField placeholder="z.B. 2" function={e => setRightTranslations(e.target.value)}/>
            </label>

            <button className="lngpckg-submitBtn" type="button" value="Submit" onClick={submitHandler}>Weiter</button>
        </Box >
    );
}

export default AddLanguagePackage;