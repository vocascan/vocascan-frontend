import React from 'react';
import { useSelector } from 'react-redux';
import AddLanguagePackage from './AddLanguagePackage.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    firstStartupInvisible: {
        display: "none",
    },

    firstStartupVisible: {
        width: "100%",
        height: "100vh",
        background: theme.palette.shadow.background,
        zIndex: 10,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
    },
    firstStartupInner: {
        width: "40%",
        height: "60%",
        margin: "auto",
        background: theme.palette.primaryColour.main,
        zIndex: "11",
        padding: "3% 10%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    firstStartupHeading: {
        fontSize: "25px",
        margin: "20px 0 0 0",
    },
}));

function FirstStartup(props) {

    const classes = useStyles();
    const isFirstLogin = useSelector(state => state.login.firstLogin);
    return (
        <Box className={isFirstLogin ? classes.firstStartupVisible : classes.firstStartupInvisible}>
            <Box className={classes.firstStartupInner}>
                <h1 className={classes.firstStartupHeading}>CREATE YOUR FIRST VOCABULARY PACKAGE</h1>
                <AddLanguagePackage />
            </Box>

        </Box>
    )
}

export default FirstStartup