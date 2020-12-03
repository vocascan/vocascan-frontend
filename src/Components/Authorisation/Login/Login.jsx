import React from 'react';
import './Login.scss';
import { useHistory } from "react-router-dom";

function Login(props) {

    let history = useHistory();
    function handleClickRegister() {
        history.push("/register");
    }

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-header">
                    <img className="login-form-header-logo" src={props.image} alt="server-logo" />
                    <h1 className="login-form-header-heading">LOGIN</h1>
                </div>
                <div className="login-form-input">
                    <input className="login-form-input-field" type="text" placeholder="Email" />
                    <input className="login-form-input-field" type="text" placeholder="Password" />
                </div>
                <div className="login-form-submit">
                    <button className="login-form-submit-Btn">SIGN IN</button>
                    <p className="login-form-submit-register">Don't have an account? <a className="login-form-submit-register-link" onClick={handleClickRegister}>Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login
