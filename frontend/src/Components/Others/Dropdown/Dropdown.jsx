import React, { useState } from 'react';
import './Dropdown.scss';

function Dropdown(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(props.title);
    const [addField, setAddField] = useState(props.addField);
    const [addFieldInput, setAddFieldInput] = useState("");
    //const [selection, setSelection] = useState(props.selection)
    let selection = props.selection;

    function handleSelection(e) {
        setCurrentSelection(e.target.value);
        props.function(e);
    }



    //iterate over array to create list items
    const items = selection.map((item) =>
        <li key={item.id}>
            <button
                type="button"
                className="dropdown-list__btn"
                value={item.title}
                onClick={e => { handleSelection(e, "value"), setIsOpen(isOpen => !isOpen) }}>
                {item.title}
            </button>
        </li>
    );

    return (
        <div className="dropdown">
            <button
                className={isOpen ? "dropdown-mainButton__open" : "dropdown-mainButton__closed"}
                type="button"
                onClick={() => { setIsOpen(isOpen => !isOpen) }}>
                {currentSelection}
            </button>

            <ul className={isOpen ? "dropdown-list__open" : "dropdown-list__closed"} >
                <div className={addField ? "dropdown-list-addField__active" : "dropdown-list-addField__inactive"}>
                    <div className="dropdown-list-addField-input">
                        <input placeholder="Hinzufügen" onChange={e => setAddFieldInput(e.target.value)}/>
                    </div>
                    <button type="button" onClick={() => { props.addFieldFunction(addFieldInput) }}></button>
                </div>
                
                {items}
            </ul>
        </div>

    )

}

export default Dropdown