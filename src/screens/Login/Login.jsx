import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "../../redux/Actions/signIn.js";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout";
import "./Login.scss";

const Login = (props) => {
  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const serverAddress = useSelector((state) => state.login.serverAddress);

  const dispatch = useDispatch();

  let history = useHistory();
  function handleClickRegister() {
    history.push("/register");
  }

  //make api call to login
  async function submitLogin() {
    //create the post request body
    let body = {
      email: email,
      password: password,
    };
    //create the config header file for request
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(serverAddress + "/api/signIn", body, config)
      .then((response) => {
        setError(false);
        //store username, email and jwt token in redux store
        dispatch(signIn({ username: response.data["username"], email: email, jwt: response.data["jwt"] }));
      })
      .catch(function (e) {
        if (e.response?.status === 403) {
          setError(true);
        }
      });
  }

  return (
    <UnauthenticatedLayout>
      <div className="login-form">
        <div className="header">
          <img className="header-logo" src={props.image} alt="server-logo" />
          <h1 className="login-form-header-heading">Login</h1>
        </div>
        <div className="form-input">
          <TextInput
            required
            placeholder="Email"
            onChange={(value) => {
              setError(false);
              setEmail(value);
            }}
          />
          <TextInput
            required
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={(value) => {
              setError(false);
              setPassword(value);
            }}
            error={error}
            errorText={"Your email or password is wrong"}
          />
        </div>
        <div className="login-footer">
          <Button block uppercase onClick={submitLogin} disabled={!(email && password)}>
            Sign in
          </Button>
          <div className="submit-register">
            Don't have an account?{" "}
            <div className="submit-register-link" onClick={handleClickRegister}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Login;
