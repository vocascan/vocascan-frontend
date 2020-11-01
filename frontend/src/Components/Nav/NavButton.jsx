import React from 'react';
import { Button, Link } from 'react-router-dom';
import './NavButton.css';

function NavButton(props) {
    return (
        <Link to={props.link} style={{ outline: 0 }}>
            <button className="nav-button">
                <h5>{props.name}</h5>
            </button>
        </Link>

    )
}

export default NavButton