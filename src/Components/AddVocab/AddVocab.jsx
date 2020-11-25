import React, {useState, useEffect} from 'react';
import InputField from '../Others/InputField/InputField.jsx';
import Dropdown from '../Others/Dropdown/Dropdown.jsx';
import languages from '../AddLanguagePackage/Languages.js';
import './AddVocab.scss';


function AddVocab(props) {
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

    return (
        <div className="routed_section">
            <div className="addVocab-form">
                <h1>Add vocabulary</h1>

                <div className="addVocab-dropdowns">
                    <label className="addVocab-dropdowns-field">
                        Vocabulary pack
                        <Dropdown title="Auswählen..." function={(e) => {setPackageName(e.target.value), refreshGroups() } } selection={packages} addField={false}/>
                    </label>
                    <label className="addVocab-dropdowns-field">
                        Group
                        <Dropdown title="Auswählen..." function={e => { setGroupName(e.target.value) }} selection={groups} addField={true} addFieldFunction={addGroup}/>
                    </label>
                </div>

                <InputField placeholder="Fremdwort" function={e => { setForeignWord(e.target.value) }}/>
                <InputField placeholder="1. Übersetzung" function={e => { setGroupName(e.target.value) }}/>
                <InputField placeholder="2. Übersetzung" function={e => { setGroupName(e.target.value) }}/>
                <InputField placeholder="3. Übersetzung" function={e => { setGroupName(e.target.value) }} />
                <InputField placeholder="Beschreibung" function={e => { setDescription(e.target.value) }}/>

                <button type="button" className="addVocab-form-submitBtn" onClick={() => {submit()}}>Add</button>
            </div>
        </div>
    )
}

export default AddVocab