import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { signIn } from "../redux/Actions/signIn.js";
import { TextField } from '@material-ui/core';
import './Login.scss';

import Button from "../Components/Button/Button"


function Login(props) {
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
                if (error.response.status === 403) {
                    setErrorMsg(true);
                }
            })
    }

    return (
        <div className="login">
            <div className="login-form">
                <div className="header">
                    <img className="header-logo" src={props.image} alt="server-logo" />
                    <h1 className="login-form-header-heading">LOGIN</h1>
                </div>
                <div className="form-input">
                    <TextField required id="standard-basic" label="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField
                        required
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <p className={errorMsg ? "error-msg__active" : "error-msg__inactive"}>Your email or password is wrong</p>
                </div>
                <div class="login-footer">
                    <Button
                        block
                        uppercase
                        onClick={submitLogin}
                    >
                        Sign in
                    </Button>
                    <p className="submit-register">Don't have an account? <div className="submit-register-link" onClick={handleClickRegister}>Sign Up</div></p>
                </div>
            </div>
        </div>
    )
}

export default Login
