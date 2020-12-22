import React from 'react';
import { Link } from 'react-router-dom';
import NavButton from './NavButton.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
//import './Nav.scss';

const useStyles = makeStyles({
    nav: {
        width: "200px",
        height: "100vh",
        background: "#313A46",
        position: "relative",
        zIndex: 4,
        },
    title: {
        width: "200px",
        height: "35px",
        float: "left",
        margin: "12px 0 60px",
    },
    text: {
        color: "#FFFFFF",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: "17px",
    },
    settings: {
        backgroundColor: "#242424",
        border: "none",
        outline: "none",
        width: "100%",
        height: "55px",
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    settingsText: {
        color: "#8790A3",
        textTransform: "uppercase",
        fontSize: "17px",
        margin: 0,
    }

})



function Nav() {
    const classes = useStyles();
    return (
        <Box className={classes.nav}>
            <Box className={classes.title}>
                <h1 className={classes.text}>Vocascan</h1>
            </Box>
            <ul>
                <NavButton name="New Vokabulary" link="/addVocab" />
                <NavButton name="Learn" link="#" />
                <NavButton name="Progress" link="#" />
                <NavButton name="All vocabulary" link="#" />
                <NavButton name="Group learning" link="#" />

            </ul>

            <Link to="#" style={{ outline: 0 }}>
                <Button className={classes.settings}>
                    <h5 className={classes.settingsText}>Settings</h5>
                </Button>
            </Link>
        </Box>
    )
}

export default Nav
