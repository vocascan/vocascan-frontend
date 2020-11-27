import React from 'react';
import SelectionBox from './SelectionBox.jsx';
import './SelectionScreen.scss';
import Image from '../../../images/vocascan-logo.png';

function SelectionScreen(props) {
    return (
        <div className="selectScrn">
            <h1 className="selectScrn-title">LOG IN</h1>
            <h1 className="selectScrn-heading">SELECT YOUR OPTION</h1>
            <div className="boxes">   
                <SelectionBox heading="Vocascan Server" description="Use the Vocascan Server and get very much advantages" image={Image}/>
                <SelectionBox heading="Own Server" description="Use your own server" image={Image}/>
            </div>
        </div>
    );
}

export default SelectionScreen;