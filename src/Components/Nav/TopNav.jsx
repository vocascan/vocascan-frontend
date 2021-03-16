import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/Actions/signOut.js';
import Button from '@material-ui/core/Button'
import './TopNav.scss';


function TopNav() {

    const [menuActive, setMenuActive] = useState(false);
    const dispatch = useDispatch();

    function handleClick() {
        setMenuActive(value => !value);
    }

    //call redux store function to log out user
    function handleLogout() {
        dispatch(signOut({}));
    }

    const username = useSelector(state => state.login.user.username);
    return (
        <div className="top-nav">
            <h3 className="user" onClick={handleClick}>{username}</h3>
            <div className={menuActive ? "menu__active" : "menu__inactive"}>
                <ul className="menu-list">
                    <li className="menu-list-item"><Button className="menu-list-item-btn">Profile</Button></li>
                    <li className="menu-list-item"><Button className="menu-list-item-btn">Settings</Button></li>
                    <li className="menu-list-item" onClick={handleLogout}><Button className="menu-list-item-btn">Log out</Button></li>
                </ul>

            </div>
        </div>
    )
}

export default TopNav