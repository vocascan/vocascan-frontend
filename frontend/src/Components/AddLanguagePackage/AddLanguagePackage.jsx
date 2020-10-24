import React from 'react';
import InputField from '../Others/InputField/InputField';
import DropdownMenu from '../Others/Dropdown/Dropdown';

function AddLanguagePackage(props) {
    const vocascanModule = require('../../../build/Debug/vocascan.node');

    function submitHandler() {
        vocascanModule.addLanguagePackage("Englisch - Deutsch", "Englisch", "Deutsch", 100, 2);
        console.log("Added");
        props.function()
    }

    return (
        <form className="lngpckg">
            <label>
                <h3>Name</h3>
                <InputField placeholder="z.B. Englisch - Deutsch" />
            </label>

            <div className="lngpckg-dropdown">
                <label className="lngpckg-dropdown-field">
                    Fremdsprache
                    <DropdownMenu title="Auswählen..." />
                </label>
                <label className="lngpckg-dropdown-field">
                    Übersetzung
                    <DropdownMenu title="Auswählen..." />
                </label>
            </div>

            <label>
                <h3>Vokabeln pro Tag</h3>
                <InputField placeholder="z.B. 100" />
            </label>

            <label>
                <h3>Richtige Übersetzungen um Vokabelpaar erfolgreich zu haben</h3>
                <InputField placeholder="z.B. 2" />
            </label>

            <button className="lngpckg-submitBtn" type="button" value="Submit" onClick={submitHandler}>Weiter</button>
        </form >
    );
}

export default AddLanguagePackage;