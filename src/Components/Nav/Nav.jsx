import React from 'react';
import { Button, Link } from 'react-router-dom';
import NavButton from './NavButton.jsx';
import './Nav.scss';



function Nav() {

    return (
        <div className="nav">
            <div className="nav-title">
                <h1>Vocascan</h1>
            </div>
            <ul>
                <NavButton name="New Vokabulary" link="/addVocab" />
                <NavButton name="Learn" link="#" />
                <NavButton name="Progress" link="#" />
                <NavButton name="All vocabulary" link="#" />
                <NavButton name="Group learning" link="#" />

            </ul>

            <Link to="#" style={{ outline: 0 }}>
                <button className="nav-button-settings">
                    <h5>Settings</h5>
                </button>
            </Link>
        </div>
    )
}

export default Nav
