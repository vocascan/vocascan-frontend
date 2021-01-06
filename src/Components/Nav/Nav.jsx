import React from 'react';
import { Link } from 'react-router-dom';
import NavButton from './NavButton.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
//import './Nav.scss';

const useStyles = makeStyles((theme) => ({
    nav: {
        width: "200px",
        height: "100vh",
        background: theme.palette.secondaryColour.main,
        gridColumnStart:1,
        gridColumnEnd:1,
        gridRowStart:1,
        gridRowEnd:2,
        zIndex: 4,
        display: "grid",
        gridTemplateColumns: "100%",
        gridTemplateRows: "40px auto 40px",

    },
    title: {
        float: "left",
        gridColumn: 1,
        gridRow: 1,
        textAlign: "center",
    },
    text: {
        color: theme.palette.font.light,
        textTransform: "uppercase",
        fontSize: "17px",
        margin: "auto",
    },
    buttonList: {
        gridColumn: 1,
        gridRow: 2,
        marginTop: "40px"
    },
    settings: {
        backgroundColor: theme.palette.third.main,
        border: "none",
        outline: "none",
        width: "100%",
        height: "100%",
        bottom: 0,
        left: 0,
        gridColumn: 1,
        gridRow: 3,
    },
    settingsText: {
        color: theme.palette.font.middle,
        textTransform: "uppercase",
        fontSize: "17px",
        margin: 0,
    }

}));



function Nav() {
    const classes = useStyles();
    return (
        <Box className={classes.nav}>
            <Box className={classes.title}>
                <h1 className={classes.text}>Vocascan</h1>
            </Box>
            <ul className={classes.buttonList}>
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
