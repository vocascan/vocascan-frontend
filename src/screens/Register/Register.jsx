import React, { useCallback, useEffect, useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { register } from "../../redux/Actions/register.js";
import { setServerSettings } from "../../redux/Actions/setServerSettings.js";
import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout";

const Register = (props) => {
  const { t } = useTranslation();

  //variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [emailIsUsed, setEmailIsUsed] = useState(false);
  const [serverAddress, setServerAddress] = useState(useSelector((state) => state.login.serverAddress));
  const [selfHosted] = useState(!serverAddress);
  const [serverError, setServerError] = useState(false);

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
    } else {
      setIsSamePassword(true);
      return true;
    }
  }, [password, passwordRepeat]);

  //make api call to register user
  async function submitRegisterPerson() {
    if (!checkPassword()) {
      return;
    }
    //create the post request body
    let body = {
      username: username,
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
      .post(`${serverAddress}/api/register`, body, config)
      .then((response) => {
        dispatch(register({ username: username, email: email, jwt: response.data["jwt"] }));
      })
      .catch(function (error) {
        if (error.response.status === 409) {
          setEmailIsUsed(true);

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
      <div className="register-form">
        <ArrowBackIcon className="back-icon" onClick={() => history.push("/plans")} />
        <div className="register-form-header">
          <img className="register-form-header-logo" src={props.image} alt="server-logo" />
          <h1 className="register-form-header-heading">{t("signUp.title")}</h1>
        </div>
        <div className="register-form-input">
          <TextInput
            required
            autoFocus
            placeholder={t("global.username")}
            autoComplete="current-password"
            onChange={(value) => {
              setEmailIsUsed(false);
              setUsername(value);
            }}
          />
          <TextInput
            required
            type="email"
            placeholder={t("global.email")}
            onChange={(value) => {
              setEmailIsUsed(false);
              setEmail(value);
            }}
            error={emailIsUsed}
            errorText={t("signUp.emailInUse")}
          />
          <TextInput
            required
            type="password"
            placeholder={t("global.password")}
            onChange={(value) => {
              setIsSamePassword(true);
              setPassword(value);
            }}
            error={!isSamePassword}
            errorText={t("signUp.passwordsDontMatch")}
          />
          <TextInput
            required
            type="password"
            placeholder={t("global.passwordRepeat")}
            onChange={(value) => {
              setIsSamePassword(true);
              setPasswordRepeat(value);
            }}
            error={!isSamePassword}
            errorText={t("signUp.passwordsDontMatch")}
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
        <div className="register-form-submit">
          <Button
            block
            uppercase
            onClick={submitRegisterPerson}
            disabled={!(username && email && password && passwordRepeat && serverAddress)}
          >
            {t("global.signUp")}
          </Button>
          <div className="register-form-submit-register">
            {t("signUp.alreadyHaveAccount")}{" "}
            <div className="register-form-submit-register-link" onClick={handleClickLogin}>
              {t("global.signIn")}
            </div>
          </div>
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Register;
