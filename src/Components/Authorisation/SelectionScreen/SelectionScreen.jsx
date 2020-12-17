import React from 'react';
import SelectionBox from './SelectionBox.jsx';
import './SelectionScreen.scss';
import {useDispatch} from "react-redux"
import Image from '../../../images/vocascan-server-logo-small.png';
import { setServerSettings } from '../../../redux/Actions/setServerSettings.js';

function SelectionScreen(props) {

    let primary = [
        {id: 0, bulletPoint: 'No need of a server'},
        {id: 1, bulletPoint: 'sync every device'}
    ];

    let secondary = [
        {id: 0, bulletPoint: 'Use your own Server'},
        {id: 1, bulletPoint: 'Full controll over the settings'}
    ];
    //dispatch to set Server address in redux
    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(setServerSettings({serverAddress: "http://127.0.0.1:13200"}));
    }
    return (
        <div className="selectScrn">
            <h1 className="selectScrn-title" >LOG IN</h1>
            <h1 className="selectScrn-heading">SELECT YOUR OPTION</h1>
            <div className="boxes">   
                <SelectionBox heading="Vocascan Server" description={primary} image={Image} function={handleSubmit}/>
                <SelectionBox heading="Own Server" description={secondary} image={Image} function={() => { }}/>
            </div>
        </div>
    );
}

export default SelectionScreen;