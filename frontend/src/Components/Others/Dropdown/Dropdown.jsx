import React, { useState } from 'react'
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
import location from './Examples';

function DropdownMenu(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(props.title);

    function handleSelection(e) {
        setCurrentSelection(e.target.value);
    }

    //iterate over array to create list items
    const items = location.map((item) =>
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
                {items}
            </ul>
        </div>

    )

}

export default DropdownMenu