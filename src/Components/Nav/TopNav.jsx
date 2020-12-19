import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TopNav.scss';
import { signOut } from '../../redux/Actions/signOut.js';

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
        <div className="topNav">
            <h3 className="topNav-user" onClick={handleClick}>{username}</h3>
            <div className={menuActive ? "topNav-menu__active" : "topNav-menu__inactive"}>
                <ul className="topNav-menu-list">
                    <li className="topNav-menu-list-item">Profile</li>
                    <li className="topNav-menu-list-item">Settings</li>
                    <li className="topNav-menu-list-item" onClick={handleLogout}>Log out</li>
                </ul>

            </div>
        </div>
    )
}

export default TopNav