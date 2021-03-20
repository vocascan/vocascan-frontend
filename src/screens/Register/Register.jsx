import React, { useCallback, useState } from 'react';
import './Register.scss';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";

import { register } from '../../redux/Actions/register.js';
import Button from "../../Components/Button/Button"
import TextInput from "../../Components/TextInput/TextInput";

const Register = (props) => {

    //variables
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [isSamePassword, setIsSamePassword] = useState(true);
    const [emailIsUsed, setEmailIsUsed] = useState(false);
    const dispatch = useDispatch();

    let history = useHistory();
    const handleClickLogin = useCallback(() => {
        history.push("/login");
    }, [history]);

    //function to check if typed in passwords are the same
    const checkPassword = useCallback(() => {
        if (password !== passwordRepeat) {
            setIsSamePassword(false);
            return false;
        }
        else {
            setIsSamePassword(true);
            return true;
        }
    }, [password, passwordRepeat]);

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
                dispatch(register({ username: username, email: email, jwt: response.data["jwt"] }));
            })
            .catch(function (error) {
                if (error.response.status === 409) {
                    setEmailIsUsed(true);
                }
            });
    }

    return (
        <div className="register">
            <div className="register-form">
                <div className="register-form-header">
                    <img className="register-form-header-logo" src={props.image} alt="server-logo" />
                    <h1 className="register-form-header-heading">Register</h1>
                </div>
                <div className="register-form-input">
                    <TextInput
                        required
                        placeholder="Username"
                        autoComplete="current-password"
                        onChange={(value) => {
                            setEmailIsUsed(false);
                            setUsername(value);
                        }}
                    />
                    <TextInput
                        required
                        type="email"
                        placeholder="Email"
                        onChange={(value) => {
                            setEmailIsUsed(false);
                            setEmail(value);
                        }}
                        error={emailIsUsed}
                        errorText={"The email is already used"}
                    />
                    <TextInput
                        required
                        type="password"
                        placeholder="Password"
                        onChange={(value) => {
                            setIsSamePassword(true);
                            setPassword(value);
                        }}
                        error={emailIsUsed}
                        errorText={"The email is already used"}
                    />
                    <TextInput
                        required
                        type="password"
                        placeholder="Repeat password"
                        onChange={(value) => {
                            setIsSamePassword(true);
                            setPasswordRepeat(value);
                        }}
                        error={!isSamePassword}
                        errorText={"The passwords are not the same"}
                    />
                </div>
                <div className="register-form-submit">
                    <Button
                        block
                        uppercase
                        onClick={submitRegisterPerson}
                        disabled={!(username && email && password && passwordRepeat)}
                    >
                        Sign up
                    </Button>
                    <div className="register-form-submit-register">
                        Already have an account? <div className="register-form-submit-register-link" onClick={handleClickLogin}>Log in</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
