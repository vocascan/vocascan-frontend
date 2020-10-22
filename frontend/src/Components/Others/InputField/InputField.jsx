import React from 'react';

function InputField(props) {
    return (
        <div className="inputField">
            <input name="inputField-input" placeholder={props.placeholder} type="text" />
        </div>
    )
}

export default InputField

