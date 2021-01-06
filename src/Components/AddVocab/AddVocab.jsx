import React, {useState, useEffect} from 'react';
import InputField from '../Others/InputField/InputField.jsx';
import Dropdown from '../Others/Dropdown/Dropdown.jsx';
import languages from '../AddLanguagePackage/Languages.js';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, InputLabel, MenuItem, TextField } from '@material-ui/core';


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
    }
    
}));


function AddVocab(props) {
    const classes = useStyles();
    const packages = [];//vocascanModule.getLanguagePackages();
    const [groups, setGroups] = useState([
        {id: 0, title: 'Deutsch'},
        {id: 1, title: 'Englisch'},
        {id: 2, title: 'Spanisch'},
    ]);

    const [packageName, setPackageName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [foreignWord, setForeignWord] = useState("");
    const [translations, setTranslations] = useState([]);
    const [description, setDescription] = useState("");

    
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
        setAge(event.target.value);
    };

    //make api call to get language packages
    async function submitLogin() {
        //create the post request body
        let body = {
        }
        //create the config header file for request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        axios.post(serverAddress + '/api/signIn', body, config)
            .then(response => {
                <MenuItem value={10}>Ten</MenuItem>
            })
            .catch(function (error) {

            })
    }

    return (
            <Box className={classes.addVocabForm}>
                <h1 className={classes.heading}>Add vocabulary</h1>

                <Box className={classes.dropdowns}>
                    {/*<label className="addVocab-dropdowns-field">
                        Vocabulary pack
                        <Dropdown title="Auswählen..." function={(e) => {setPackageName(e.target.value), refreshGroups() } } selection={packages} addField={false}/>
    </label>*/}
                    <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Package</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={packageName}
                            onChange={(e) => setPackageName(e.target.value)}
                            label="Package"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <PackageItems />
                        </Select>
                    </FormControl>
                    <FormControl required variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            label="Group"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className={classes.inputFields}>
                    <TextField required id="standard-basic" label="Fremdwort" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField required id="standard-basic" label="1. Übersetzung" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField required id="standard-basic" label="2. Übersetzung" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField required id="standard-basic" label="3. Übersetzung" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField required id="standard-basic" label="Beschreibung" onChange={(e) => { setEmail(e.target.value) }} />
                </Box>
                

                <Button className={classes.submitBtn} onClick={() => {submit()}}>Add</Button>
            </Box>
    )
}

export default AddVocab