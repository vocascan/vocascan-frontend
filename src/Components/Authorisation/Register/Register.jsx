import React, {useState} from 'react';
import './Register.scss';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {useDispatch} from "react-redux"
import regeneratorRuntime from "regenerator-runtime";
import { register } from '../../../redux/Actions/register.js';

function Register(props) {

    //variables
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [isSamePassword, setIsSamePassword] = useState(true);
    const [emailIsUsed, setEmailIsUsed] = useState(false);
    const dispatch = useDispatch();

    let history = useHistory();
    function handleClickLogin() {
        history.push("/login");
    }

    //function to check if typed in passwords are the same
    function checkPassword() {
        if (password != passwordRepeat) {
            setIsSamePassword(false);
            return false;
        }
        else {
            setIsSamePassword(true);
            return true
        }
    }


    //make api call to register user
    async function submitRegisterPerson() {

        if (!checkPassword()) {
            return
        }
        //create the post request body
        let body = {
                "username": username,
                "email": email,
                "password": password
            } 
        //create the config header file for request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        axios.post('http://127.0.0.1:13200/api/register', body, config)
            .then(response => {
                dispatch(register({username: username, email: email, jwt: response.data["jwt"]}));
            })
            .catch(function (error) {
                if (error.response.status == 409) {
                    setEmailIsUsed(true);
                }
            });
    }

    return (
        <div className="register">
            <div className="register-form">
                <div className="register-form-header">
                    <img className="register-form-header-logo" src={props.image} alt="server-logo" />
                    <h1 className="register-form-header-heading">REGISTER</h1>
                </div>
                <div className="register-form-input">
                    <input className="register-form-input-field" type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                    <input className="register-form-input-field" type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <p className={emailIsUsed ? "register-form-warning__visible" : "register-form-warning__invisible"}>The email is already used</p>
                    <input className="register-form-input-field" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <input className="register-form-input-field" type="password" placeholder="Repeat password" onChange={(e) => { setPasswordRepeat(e.target.value) }} />
                    <p className={isSamePassword ? "register-form-warning__invisible" : "register-form-warning__visible"}>The passwords are not the same</p>
                </div>
                <div className="register-form-submit">
                    <button className="register-form-submit-Btn" onClick={submitRegisterPerson}>SIGN IN</button>
                    <p className="register-form-submit-register">Don't have an account? <a className="register-form-submit-register-link" onClick={handleClickLogin}>Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register
