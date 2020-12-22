import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../redux/Actions/signOut.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    topNav: {
        width: "calc(100% - 200px)",
        height: "40px",
        background: "#313A46",
        margin: "0 0 0 200px",
        position: "absolute",
        zIndex: 3,
    },
    user: {
        color: "#FFFFFF",
        position: "absolute",
        left: "85%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        cursor: "pointer",
    },
    menuInactive: {
        display: "none"
    },
    menuActive: {
        width: "200px",
        height: "150px",
        margin: "40px 0 0 0",
        background: "#313A46",
        position: "absolute",
        left: "85%",
        transform: "translate(-50%,0)",
        padding: "10px",
    },
    menuList: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        margin: 0,
        padding: 0,
    },
    menuListItem: {
        listStyle: "none",
    },
    menuListItemBtn: {
        padding: "10px 0",
        width: "100%",
        color: "#ffffff"
    }
})


function TopNav() {

    const classes = useStyles();
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
        <Box className={classes.topNav}>
            <h3 className={classes.user} onClick={handleClick}>{username}</h3>
            <div className={menuActive ? classes.menuActive : classes.menuInactive}>
                <ul className={classes.menuList}>
                    <li className={classes.menuListItem}><Button className={classes.menuListItemBtn}>Profile</Button></li>
                    <li className={classes.menuListItem}><Button className={classes.menuListItemBtn}>Settings</Button></li>
                    <li className={classes.menuListItem} onClick={handleLogout}><Button className={classes.menuListItemBtn}>Log out</Button></li>
                </ul>

            </div>
        </Box>
    )
}

export default TopNav