import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { signIn } from "../../redux/Actions/signIn.js";
import { setServerSettings } from "../../redux/Actions/setServerSettings.js";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout";
import "./Login.scss";

const Login = (props) => {
  const { t } = useTranslation();

  //variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [serverAddress, setServerAddress] = useState(useSelector((state) => state.login.serverAddress));
  const [selfHosted] = useState(!serverAddress);
  const [serverError, setServerError] = useState(false);

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
      .post(`${serverAddress}/api/signIn`, body, config)
      .then((response) => {
        setError(false);
        //store username, email and jwt token in redux store
        dispatch(signIn({ username: response.data["username"], email: email, jwt: response.data["jwt"] }));
      })
      .catch(function (e) {
        if (e.response?.status === 403) {
          setError(true);

          return;
        }

        setServerError(true);
      });
  }

  useEffect(() => {
    dispatch(setServerSettings({ serverAddress }));
  }, [serverAddress, dispatch]);

  return (
    <UnauthenticatedLayout>
      <div className="login-form">
        <ArrowBackIcon className="back-icon" onClick={() => history.push("/plans")} />
        <div className="header">
          <img className="header-logo" src={props.image} alt="server-logo" />
          <h1 className="login-form-header-heading">{t("login.title")}</h1>
        </div>
        <div className="form-input">
          <TextInput
            autoFocus
            required
            placeholder={t("global.email")}
            onChange={(value) => {
              setError(false);
              setEmail(value);
            }}
          />
          <TextInput
            required
            type="password"
            placeholder={t("global.password")}
            autoComplete="current-password"
            onChange={(value) => {
              setError(false);
              setPassword(value);
            }}
            error={error}
            errorText={t("login.wrongCredentials")}
          />
          {selfHosted && (
            <TextInput
              required
              placeholder={t("global.server")}
              onChange={(value) => {
                setServerError(false);
                setServerAddress(value);
              }}
              error={serverError}
              errorText={t("global.serverNotResponding")}
            />
          )}
        </div>
        <div className="login-footer">
          <Button block uppercase onClick={submitLogin} disabled={!(email && password && serverAddress)}>
            {t("global.signIn")}
          </Button>
          <div className="submit-register">
            {t("login.dontHaveAccount")}{" "}
            <div className="submit-register-link" onClick={handleClickRegister}>
              {t("global.signUp")}
            </div>
          </div>
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Login;
