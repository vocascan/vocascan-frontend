import React from 'react';
import AddLanguagePackage from '../AddLanguagePackage/AddLanguagePackage.jsx';
import './StartPopup.css';

function StartPopup(props) {
    return (
        <div className='popup'>
            <div className="popup-inner">
                <div className="popup-inner__textField">
                    <h1>Erstelle dein erstes Vokabelpaket</h1>
                    <AddLanguagePackage function={props.closePopup} />
                </div>

            </div>
        </div>
    );
}

export default StartPopup;