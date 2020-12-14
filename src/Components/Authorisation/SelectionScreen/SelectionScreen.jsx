import React from 'react';
import SelectionBox from './SelectionBox.jsx';
import './SelectionScreen.scss';
import Image from '../../../images/vocascan-server-logo-small.png';

function SelectionScreen(props) {

    let primary = [
        {id: 0, bulletPoint: 'No need of a server'},
        {id: 1, bulletPoint: 'sync every device'}
    ];

    let secondary = [
        {id: 0, bulletPoint: 'Use your own Server'},
        {id: 1, bulletPoint: 'Full controll over the settings'}
    ];
    return (
        <div className="selectScrn">
            <h1 className="selectScrn-title">LOG IN</h1>
            <h1 className="selectScrn-heading">SELECT YOUR OPTION</h1>
            <div className="boxes">   
                <SelectionBox heading="Vocascan Server" description={primary} image={Image}/>
                <SelectionBox heading="Own Server" description={secondary} image={Image}/>
            </div>
        </div>
    );
}

export default SelectionScreen;