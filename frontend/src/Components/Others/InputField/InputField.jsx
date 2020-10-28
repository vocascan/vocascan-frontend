import React from 'react';

function InputField(props) {
    return (
        <div className="inputField">
            <input name="inputField-input" placeholder={props.placeholder} type="text" onChange={props.function}/>
        </div>
    )
}

export default InputField

