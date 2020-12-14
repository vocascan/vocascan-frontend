import React, {useState} from 'react';
import './Login.scss';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {useDispatch} from "react-redux"
import { login } from "../../../redux/Actions/index.js";

function Login(props) {

    //variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [errorMsg, setErrorMsg] = useState(false);

    const { register, handleSubmit, getValues, watch, errors } = useForm();
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
        axios.post('http://127.0.0.1:13200/api/signIn', body, config)
            .then(response => {
                setErrorMsg(false);
                //store username, email and jwt token in redux store
                dispatch(login({userName: "Julian Jaksch", email: email, token: response.data}));

            })
            .catch(function (error) {
                if (error.response.status == 403) {
                    setErrorMsg(true);
                }
            })
    }

    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-header">
                    <img className="login-form-header-logo" src={props.image} alt="server-logo" />
                    <h1 className="login-form-header-heading">LOGIN</h1>
                </div>
                <div className="login-form-input">
                    <input className="login-form-input-field" type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                    <input className="login-form-input-field" type="text" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <p className={errorMsg ? "login-form-errorMsg__active" : "login-form-errorMsg__inactive"}>Your email or password is wrong</p>
                </div>
                <div className="login-form-submit">
                    <button className="login-form-submit-Btn" onClick={submitLogin}>SIGN IN</button>
                    <p className="login-form-submit-register">Don't have an account? <a className="login-form-submit-register-link" onClick={handleClickRegister}>Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login
