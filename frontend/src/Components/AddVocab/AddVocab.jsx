import React from 'react';
import InputField from '../Others/InputField/InputField';
import { DropdownList } from 'react-widgets';
import Input from 'react-widgets/lib/Input';

function AddVocab(props) {

    let colors = ['orange', 'red', 'blue', 'purple']

    return (
        <div className="routed_section">
            <div className="addVocab-form">
                <h1>Test</h1>

                <InputField placeholder="Fremdwort" />
            </div>
        </div>
    )
}

export default AddVocab