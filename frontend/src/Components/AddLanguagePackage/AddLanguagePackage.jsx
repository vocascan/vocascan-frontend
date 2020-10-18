import React from 'react';
import InputField from '../Others/InputField/InputField';
import Dropdown from '../Others/Dropdown/Dropdown';

function AddLanguagePackage(props) {

    const options = [
        'one', 'two', 'three'
    ];

    return (
        <form className="lngpckg_inner_div">
            <label>
                <h3>Name</h3>
                <InputField placeholder="z.B. Englisch - Deutsch" />
            </label>


            <Dropdown />

            <label>
                <h3>Vokabeln pro Tag</h3>
                <InputField placeholder="z.B. 100" />
            </label>

            <label>
                <h3>Richtige Übersetzungen um Vokabelpaar erfolgreich zu haben</h3>
                <InputField placeholder="z.B. 2" />
            </label>

            <input type="submit" value="Submit" />
        </form>
    );
}

export default AddLanguagePackage;