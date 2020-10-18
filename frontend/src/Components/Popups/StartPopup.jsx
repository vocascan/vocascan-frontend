import React from 'react';
import AddLanguagePackage from '../AddLanguagePackage/AddLanguagePackage';

function StartPopup(props) {
    return (
        <div className='popup'>
            <div className="popup_inner">
                <div className="text_field">
                    <h1>Erstelle dein erstes Vokabelpaket</h1>
                    <button onClick={props.closePopup}>close me</button>
                    <AddLanguagePackage />
                </div>

            </div>
        </div>
    );
}

export default StartPopup;