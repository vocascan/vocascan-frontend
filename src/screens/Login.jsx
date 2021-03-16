import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../redux/Actions/signIn.js";
import { Button, TextField, makeStyles, Box } from '@material-ui/core';


function Login(props) {

    const classes = useStyles();
    //variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const serverAddress = useSelector(state => state.login.serverAddress);

    const dispatch = useDispatch();


    let history = useHistory();
    function handleClickRegister() {
        history.push("/register");
    }

    //make api call to login
    async function submitLogin() {
        //create the post request body
        let body = {
            "email": email,
            "password": password
        }
        //create the config header file for request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        axios.post(serverAddress + '/api/signIn', body, config)
            .then(response => {
                setErrorMsg(false);
                //store username, email and jwt token in redux store
                dispatch(signIn({ username: response.data["username"], email: email, jwt: response.data["jwt"] }));

            })
            .catch(function (error) {
                if (error.response.status == 403) {
                    setErrorMsg(true);
                }
            })
    }

    return (
        <div className={classes.login}>
            <div className={classes.loginForm}>
                <div className={classes.header}>
                    <img className={classes.headerLogo} src={props.image} alt="server-logo" />
                    <h1 className="login-form-header-heading">LOGIN</h1>
                </div>
                <div className={classes.formInput}>
                    <TextField required id="standard-basic" label="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField
                        required
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <p className={errorMsg ? classes.errorMsgActive : classes.errorMsgInactive}>Your email or password is wrong</p>
                </div>
                <div>
                    <Button variant="contained" className={classes.submitBtn} onClick={submitLogin}>
                        SIGN IN
                    </Button>
                    <p className={classes.submitRegister}>Don't have an account? <a className={classes.submitRegisterLink} onClick={handleClickRegister}>Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    login: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to top right, #2e5695, #F7D0FB)"
    },
    loginForm: {
        width: "25%",
        height: "60%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        padding: "40px",
        background: theme.palette.primaryColour.main,
        boxShadow: "-1px 3px 5px " + theme.palette.shadow.main,
    },
    header: {
        width: "100%",
        height: "33%",
    },
    headerLogo: {
        height: "70%",
        margin: "auto",
    },
    formInput: {
        width: "60%",
        height: "30%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    errorMsgInactive: {
        display: "none",
    },
    errorMsgActive: {
        fontSize: "15px",
        color: theme.palette.error.main,
    },
    submitBtn: {
        width: "60%",
        height: "40px",
        color: theme.palette.font.light,
        background: theme.palette.action.main,
    },
    submitRegister: {
        fontSize: "12px",
    },
    submitRegisterLink: {
        color: "blue",
        cursor: "pointer",
    }
}));


export default Login
