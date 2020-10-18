import React from 'react';

function InputField(props) {
    return (
        <div className="input_field">
            <input name="input_field" placeholder={props.placeholder} type="text" />
        </div>
    )
}

export default InputField

