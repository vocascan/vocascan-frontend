import React from 'react';
import InputField from '../Others/InputField/InputField';
import DropdownMenu from '../Others/Dropdown/Dropdown';

function AddLanguagePackage(props) {

    return (
        <form className="lngpckg">
            <label>
                <h3>Name</h3>
                <InputField placeholder="z.B. Englisch - Deutsch" />
            </label>

            <div className="lngpckg-dropdown">
                <div className="lngpckg-dropdown-field">
                    <DropdownMenu title="Fremdsprache" />
                </div>
                <div className="lngpckg-dropdown-field">
                    <DropdownMenu title="Übersetzung" />
                </div>
            </div>

            <label>
                <h3>Vokabeln pro Tag</h3>
                <InputField placeholder="z.B. 100" />
            </label>

            <label>
                <h3>Richtige Übersetzungen um Vokabelpaar erfolgreich zu haben</h3>
                <InputField placeholder="z.B. 2" />
            </label>

            <button type="button" value="Submit" onClick={() => { console.log("Test") }} />
        </form>
    );
}

export default AddLanguagePackage;