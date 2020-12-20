import React from 'react';
import './FirstStartup.scss';
import { useSelector } from 'react-redux';
import AddLanguagePackage from '../AddLanguagePackage/AddLanguagePackage.jsx';

function FirstStartup(props) {

    const isFirstLogin = useSelector(state => state.login.firstLogin);
    return (
        <div className={isFirstLogin ? "firstStartup__visible" : "firstStartup__invisible"}>
            <div className="firstStartup-inner">
                <h1 className="firstStartup-inner-heading">CREATE YOUR FIRST VOCABULARY PACKAGE</h1>
                <AddLanguagePackage />
            </div>
            
        </div>
    )
}

export default FirstStartup