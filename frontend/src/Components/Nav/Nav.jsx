import React from 'react';
import { Button, Link } from 'react-router-dom';
import NavButton from './NavButton';

function Nav() {
    return (
        <div className="navbar">
            <div className="bar-title">
                <h1>Vocascan</h1>
            </div>
            <ul>
                <NavButton name="Neue Vokabeln" link="/addVocab" />
                <NavButton name="Lernen" link="#" />
                <NavButton name="Fortschritt" link="#" />
                <NavButton name="Alle Vokabeln" link="#" />
                <NavButton name="Gruppe lernen" link="#" />

            </ul>

            <Link to="#" style={{ outline: 0 }}>
                <button className="settings-button">
                    <h5>Einstellungen</h5>
                </button>
            </Link>
        </div>
    )
}

export default Nav
