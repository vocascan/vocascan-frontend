import React, {useState, useEffect} from 'react';
import InputField from '../Others/InputField/InputField.jsx';
import Dropdown from '../Others/Dropdown/Dropdown.jsx';
import languages from '../AddLanguagePackage/Languages.js';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    routedSection: {
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    addVocabForm: {
        width: "50%",
        height: "60%",
        color: theme.palette.font.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "auto",
    },
    dropdowns: {
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 4,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "200px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    submitBtn: {
        width: "150px",
        height: "35px",
        background: theme.palette.action.main,
        borderRadius: "5px",
        border: "none",
        outline: "none",
        boxShadow: "-1px 3px 5px " + theme.palette.shadow.main,
        margin: "0 auto",
        cursor: "pointer",
        color: theme.palette.font.light,
        fontSize: "15px",
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

    return (
        <Box className={classes.routedSection} color="secondary">
            <Box className={classes.addVocabForm}>
                <h1>Add vocabulary</h1>

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
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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

                <InputField placeholder="Fremdwort" function={e => { setForeignWord(e.target.value) }}/>
                <InputField placeholder="1. Übersetzung" function={e => { setGroupName(e.target.value) }}/>
                <InputField placeholder="2. Übersetzung" function={e => { setGroupName(e.target.value) }}/>
                <InputField placeholder="3. Übersetzung" function={e => { setGroupName(e.target.value) }} />
                <InputField placeholder="Beschreibung" function={e => { setDescription(e.target.value) }}/>

                <Button className={classes.submitBtn} onClick={() => {submit()}}>Add</Button>
            </Box>
        </Box>
    )
}

export default AddVocab