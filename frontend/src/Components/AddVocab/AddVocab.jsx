import React from 'react';
import { DropdownList } from 'react-widgets';

function AddVocab(props) {

    let colors = ['orange', 'red', 'blue', 'purple']

    return (
        <div id="add_person_interface" className="routed_section">
            <h1>Guten Morgen mein Name ist Julian Jaksch und toll</h1>

            <DropdownList
                disabled
                data={colors}
                defaultValue={"orange"}
            />
        </div>

    )
}

export default AddVocab