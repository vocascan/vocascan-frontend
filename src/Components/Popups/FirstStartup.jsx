import React from 'react';
import './FirstStartup.scss';
import { useSelector } from 'react-redux';

function FirstStartup(props) {

    const isFirstLogin = useSelector(state => state.login.firstLogin);
    return (
        <div className={isFirstLogin ? "firstStartup__visible" : "firstStartup__invisible"}>
            <h1>Hello World</h1>
        </div>
    )
}

export default FirstStartup