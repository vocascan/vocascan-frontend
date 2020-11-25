import React from 'react';
import AddLanguagePackage from '../AddLanguagePackage/AddLanguagePackage.jsx';
import './StartPopup.scss';

function StartPopup(props) {
    return (
        <div className='popup'>
            <div className="popup-inner">
                <div className="popup-inner__textField">
                    <h1>Create your first vocabulary pack</h1>
                    <AddLanguagePackage function={props.closePopup} />
                </div>

            </div>
        </div>
    );
}

export default StartPopup;