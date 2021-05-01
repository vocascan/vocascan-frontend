import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Button from "../../Components/Button/Button.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";
import ServerValidIndicator from "../../Components/Indicators/ServerValidIndicator/ServerValidIndicator.jsx";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";

import { setServerUrl, register } from "../../redux/Actions/login.js";
import { register as registerAPI } from "../../utils/api.js";

import "./Register.scss";

const Register = ({ image }) => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [emailIsUsed, setEmailIsUsed] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const serverAddress = useSelector((state) => state.login.serverAddress);
  const selfHosted = useSelector((state) => state.login.selfHosted);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClickLogin = useCallback(() => {
    history.push("/login");
  }, [history]);

  // check if typed in passwords are the same
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
  const submitRegisterPerson = useCallback(
    async (e) => {
      e.preventDefault();

      if (!canSubmit) {
        return;
      }

      if (!checkPassword()) {
        return;
      }

      registerAPI({
        username,
        email,
        password,
      })
        .then((response) => {
          dispatch(
            register({
              username: response.data.user.username,
              email,
              token: response.data.token,
            })
          );
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setServerError(false);
            setEmailIsUsed(true);
            return;
          }

          setServerError(true);
        });
    },
    [canSubmit, checkPassword, dispatch, email, password, username]
  );

  useEffect(() => {
    if (selfHosted && !serverAddress) {
      setCanSubmit(false);

      return;
    }

    setCanSubmit(!(!username || !email || !password || !passwordRepeat));
  }, [username, email, password, passwordRepeat, selfHosted, serverAddress]);

  return (
    <UnauthenticatedLayout>
      <div className="register-form">
        <ArrowBackIcon
          className="back-icon"
          onClick={() => history.push("/plans")}
        />
        <div className="register-form-header">
          <img
            className="register-form-header-logo"
            src={image}
            alt="server-logo"
          />
          <h1 className="register-form-header-heading">
            {t("screens.register.title")}
          </h1>
        </div>
        <form onSubmit={submitRegisterPerson}>
          <div className="register-form-input">
            <TextInput
              required
              autoFocus
              placeholder={t("global.username")}
              autoComplete="current-password"
              onChange={(value) => {
                setEmailIsUsed(false);
                setServerError(false);
                setUsername(value);
              }}
              value={username}
            />
            <TextInput
              required
              type="email"
              placeholder={t("global.email")}
              onChange={(value) => {
                setEmailIsUsed(false);
                setServerError(false);
                setEmail(value);
              }}
              value={email}
              error={emailIsUsed}
              errorText={t("screens.register.emailInUse")}
            />
            <TextInput
              required
              type="password"
              placeholder={t("global.password")}
              onChange={(value) => {
                setIsSamePassword(true);
                setServerError(false);
                setPassword(value);
              }}
              value={password}
              error={!isSamePassword}
              errorText={t("screens.register.passwordsDontMatch")}
            />
            <TextInput
              required
              type="password"
              placeholder={t("global.passwordRepeat")}
              onChange={(value) => {
                setIsSamePassword(true);
                setServerError(false);
                setPasswordRepeat(value);
              }}
              value={passwordRepeat}
              error={!isSamePassword}
              errorText={t("screens.register.passwordsDontMatch")}
            />
            {selfHosted && (
              <TextInput
                required
                placeholder={t("global.server")}
                onChange={(value) => {
                  setServerError(false);
                  dispatch(setServerUrl({ serverAddress: value }));
                }}
                value={serverAddress}
              />
            )}
            <ServerValidIndicator />
            {serverError && (
              <p className="form-error">{t("global.serverNotResponding")}</p>
            )}
          </div>
          <div className="register-form-submit">
            <Button
              block
              uppercase
              onClick={submitRegisterPerson}
              disabled={!canSubmit}
            >
              {t("global.signUp")}
            </Button>
            <div className="register-form-submit-register">
              {t("screens.register.alreadyHaveAccount")}{" "}
              <div
                className="register-form-submit-register-link"
                onClick={handleClickLogin}
              >
                {t("global.signIn")}
              </div>
            </div>
          </div>
        </form>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Register;
