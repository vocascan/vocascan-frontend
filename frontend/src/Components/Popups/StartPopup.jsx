import React from 'react';
import AddLanguagePackage from '../AddLanguagePackage/AddLanguagePackage';

function StartPopup(props) {
    return (
        <div className='popup'>
            <div className="popup-inner">
                <div className="popup-inner__textField">
                    <h1>Erstelle dein erstes Vokabelpaket</h1>
                    <button onClick={props.closePopup}>close me</button>
                    <AddLanguagePackage />
                </div>

            </div>
        </div>
    );
}

export default StartPopup;