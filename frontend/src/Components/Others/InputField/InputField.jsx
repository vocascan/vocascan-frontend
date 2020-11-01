import React from 'react';
import './InputField.css';

function InputField(props) {
    return (
        <div className="inputField">
            <input name="inputField-input" placeholder={props.placeholder} type="text" onChange={props.function}/>
        </div>
    )
}

export default InputField

