import React, {useState} from 'react';
import InputField from '../Others/InputField/InputField';
import Dropdown from '../Others/Dropdown/Dropdown';
import languages from '../AddLanguagePackage/Languages';

function AddVocab(props) {

    var vocascanModule = require('bindings')('vocascan.node');
    const packages = vocascanModule.getLanguagePackages();
    const [groups, setGroups] = useState([]);

    var packageName = "";
    const [groupName, setGroupName] = useState("");
    const [foreignWord, setForeignWord] = useState("");
    const [translations, setTranslations] = useState([]);
    const [description, setDescription] = useState("");

    
    function refreshGroups() {
        setGroups(vocascanModule.getGroups(packageName)); 
    }

    function submit() {
        vocascanModule.addVocab(packageName, groupName, foreignWord, translations, description);
    }

    return (
        <div className="routed_section">
            <div className="addVocab-form">
                <h1>Vokabel hinzufügen</h1>

                <div className="addVocab-dropdowns">
                    <label className="addVocab-dropdowns-field">
                        Vokabelpaket
                        <Dropdown title="Auswählen..." function={e => { packageName = e.target.value, refreshGroups() } } selection={packages}/>
                    </label>
                    <label className="addVocab-dropdowns-field">
                        Gruppe
                        <Dropdown title="Auswählen..." function={e => { setGroupName(e.target.value) }} selection={groups}/>
                    </label>
                </div>

                <InputField placeholder="Fremdwort" function={e => { setForeignWord(e.target.value) }}/>
                <InputField placeholder="1. Übersetzung" function={e => { setGroupName(e.target.value) }}/>
                <InputField placeholder="2. Übersetzung" function={e => { setGroupName(e.target.value) }}/>
                <InputField placeholder="3. Übersetzung" function={e => { setGroupName(e.target.value) }} />
                <InputField placeholder="Beschreibung" function={e => { setDescription(e.target.value) }}/>

                <button type="button" className="addVocab-form-submitBtn" onClick={() => {submit()}}>Hinzufügen</button>
            </div>
        </div>
    )
}

export default AddVocab