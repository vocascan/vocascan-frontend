import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Button from "../../Components/Button/Button";
import TextInput from "../../Components/TextInput/TextInput";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout";

import { login } from "../../utils/api";
import { setServerUrl, signIn } from "../../redux/Actions/login";

import "./Login.scss";

const Login = ({ image }) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const serverAddress = useSelector((state) => state.login.serverAddress);
  const selfHosted = useSelector((state) => state.login.selfHosted);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClickRegister = useCallback(() => {
    history.push("/register");
  }, [history]);

  //make api call to login
  async function submitLogin(e) {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    login({
      email,
      password,
    })
      .then((response) => {
        setError(false);

        //store username, email and jwt token in redux store
        dispatch(
          signIn({
            username: response.data.user.username,
            email,
            token: response.data.token,
          })
        );
      })
      .catch(function (e) {
        if (e.response?.status === 401 || e.response?.status === 404) {
          setServerError(false);
          setError(true);
          return;
        }

        setServerError(true);
      });
  }

  useEffect(() => {
    if (selfHosted && !serverAddress) {
      setCanSubmit(false);

      return;
    }

    setCanSubmit(!(!email || !password));
  }, [email, password, selfHosted, serverAddress]);

  return (
    <UnauthenticatedLayout>
      <div className="login-form">
        <ArrowBackIcon className="back-icon" onClick={() => history.push("/plans")} />
        <div className="header">
          <img className="header-logo" src={image} alt="server-logo" />
          <h1 className="login-form-header-heading">{t("screens.login.title")}</h1>
        </div>
        <form onSubmit={submitLogin}>
          <div className="form-input">
            <TextInput
              autoFocus
              required
              placeholder={t("global.email")}
              onChange={(value) => {
                setError(false);
                setEmail(value);
              }}
              value={email}
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
              value={password}
              error={error}
              errorText={t("screens.login.wrongCredentials")}
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
            {serverError && <p className="form-error">{t("global.serverNotResponding")}</p>}
          </div>
          <div className="login-footer">
            <Button block uppercase onClick={submitLogin} disabled={!canSubmit}>
              {t("global.signIn")}
            </Button>
            <div className="submit-register">
              {t("screens.login.dontHaveAccount")}{" "}
              <div className="submit-register-link" onClick={handleClickRegister}>
                {t("global.signUp")}
              </div>
            </div>
          </div>
        </form>
      </div>
    </UnauthenticatedLayout>
  );
};

export default Login;
