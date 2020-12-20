import React from 'react';
import './FirstStartup.scss';
import { useSelector } from 'react-redux';
<<<<<<< HEAD
=======
import AddLanguagePackage from '../AddLanguagePackage/AddLanguagePackage.jsx';
>>>>>>> mui

function FirstStartup(props) {

    const isFirstLogin = useSelector(state => state.login.firstLogin);
    return (
        <div className={isFirstLogin ? "firstStartup__visible" : "firstStartup__invisible"}>
<<<<<<< HEAD
            <h1>Hello World</h1>
=======
            <div className="firstStartup-inner">
                <h1 className="firstStartup-inner-heading">CREATE YOUR FIRST VOCABULARY PACKAGE</h1>
                <AddLanguagePackage />
            </div>
            
>>>>>>> mui
        </div>
    )
}

export default FirstStartup