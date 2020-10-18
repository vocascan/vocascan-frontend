import React from 'react';
import InputField from '../Others/InputField/InputField';
import { DropdownList } from 'react-widgets';
import Input from 'react-widgets/lib/Input';

function AddVocab(props) {

    let colors = ['orange', 'red', 'blue', 'purple']

    return (
        <div className="routed_section">
            <div className="add_vocab_form_field">
                <div id="add_person_interface" className="routed_section">
                    <h1>Test</h1>


                    <InputField />
                </div>
            </div>
        </div>
    )
}

export default AddVocab