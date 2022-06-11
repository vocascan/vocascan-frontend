import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Button from "../../../Components/Button/Button.jsx";
import TextInput from "../../../Components/Form/TextInput/TextInput.jsx";
import InviteCodeValidIndicator from "../../../Components/Indicators/InviteCodeValidIndicator/InviteCodeValidIndicator.jsx";
import PasswordComplexityIndicator from "../../../Components/Indicators/PasswordComplexityIndicator/PasswordComplexityIndicator.jsx";
import ServerValidIndicator from "../../../Components/Indicators/ServerValidIndicator/ServerValidIndicator.jsx";
import UnauthenticatedLayout from "../../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";
import EmailVerify from "../EmailVerify/EmailVerify.jsx";

import useLinkCreator from "../../../hooks/useLinkCreator.js";
import { setLanguages } from "../../../redux/Actions/language.js";
import { setServerUrl, register } from "../../../redux/Actions/login.js";
import {
  register as registerAPI,
  getLanguages,
  getInfo,
} from "../../../utils/api.js";
import {
  maxTextfieldLength,
  maxUsernameLength,
  pages,
} from "../../../utils/constants.js";
import { bytesLength } from "../../../utils/index.js";

import "./Register.scss";

const Register = ({ image }) => {
  const { t } = useTranslation();

  const serverAddress = useSelector((state) => state.login.serverAddress);
  const selfHosted = useSelector((state) => state.login.selfHosted);
  const languages = useSelector((state) => state.language.languages);

  const privacyText = t("screens.register.readPrivacy");
  const [privacyTextBefore, privacyTextLink, ...privacyTextAfter] =
    privacyText.split(/[[\]]/);
  const termsText = t("screens.register.acceptTerms");
  const [termsTextBefore, termsTextLink, ...termsTextAfter] =
    termsText.split(/[[\]]/);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordComplexity, setPasswordComplexity] = useState(0);
  const [isPasswordComplexityOk, setIsPasswordComplexityOk] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [serverAddressInput, setServerAddressInput] = useState(serverAddress);
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [usernameIsUsed, setUsernameIsUsed] = useState(false);
  const [emailIsUsed, setEmailIsUsed] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [isServerValid, setIsServerValid] = useState(false);
  const [isServerLocked, setIsServerLocked] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isInviteCodeValid, setIsInviteCodeValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [readPrivacy, setReadPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [serverInfo, setServerInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatchRegister = useRef(() => {});

  const { SHOW_PLANS: showPlans, BASE_URL: baseURL } = window.VOCASCAN_CONFIG;

  const { isValid: isPrivacyPolicyValid, url: privacyPolicyUrl } =
    useLinkCreator({ path: pages.privacyPolicy });
  const { isValid: isTermsAndConditionsValid, url: termsAndConditionsUrl } =
    useLinkCreator({ path: pages.termsAndConditions });

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClickLogin = useCallback(() => {
    history.push("/login");
  }, [history]);

  const handleReadPrivacy = useCallback(() => {
    setReadPrivacy((readPrivacy) => !readPrivacy);
  }, []);

  const handleAcceptTerms = useCallback(() => {
    setAcceptTerms((acceptTerms) => !acceptTerms);
  }, []);

  //fetch languages
  const fetchLanguages = useCallback(() => {
    // when array is empty no languages were stored. Then add them to the store
    if (languages.length === 0) {
      getLanguages({ nativeNames: true }).then((res) => {
        dispatch(
          setLanguages({
            languages: res.data,
          })
        );
      });
    }
  }, [dispatch, languages.length]);

  //make api call to register user
  const submitRegisterPerson = useCallback(
    async (e) => {
      e.preventDefault();

      if (!canSubmit) {
        return;
      }

      try {
        const registerResp = await registerAPI(
          { username, email, password },
          isServerLocked ? inviteCode : null
        );
        const serverInfoResp = await getInfo();

        setServerInfo(serverInfoResp.data);
        setUserData({
          ...registerResp.data,
          user: { ...registerResp.data.user, email },
        });

        dispatchRegister.current = () => {
          //store username, email and jwt token in redux store
          dispatch(
            register({
              username: registerResp.data.user.username,
              email,
              token: registerResp.data.token,
              isAdmin: registerResp.data.user.isAdmin,
            })
          );

          //fetch languages from server
          fetchLanguages();
        };

        // check if email needs to be verified dialog should be shown
        if (
          !registerResp.data.user.emailVerified &&
          serverInfoResp.data?.email_confirm?.enabled &&
          serverInfoResp.data?.email_confirm?.level !== "low"
        ) {
          setShowEmailVerify(true);
        } else {
          dispatchRegister.current();
        }
      } catch (error) {
        if (error.response?.status === 409) {
          setServerError(false);
          if (
            error.response.data.fields.find((elem) => {
              return elem.field === "username";
            })
          ) {
            setUsernameIsUsed(true);
          } else if (
            error.response.data.fields.find((elem) => {
              return elem.field === "email";
            })
          ) {
            setEmailIsUsed(true);
          }
          return;
        }
        setServerError(true);
      }
    },
    [
      canSubmit,
      dispatch,
      email,
      fetchLanguages,
      inviteCode,
      isServerLocked,
      password,
      username,
    ]
  );

  useEffect(() => {
    const passwordLength = bytesLength(password);

    setIsPasswordComplexityOk(
      passwordLength >= 8 && passwordLength <= 72 && passwordComplexity >= 4
    );
  }, [password, passwordComplexity]);

  useEffect(() => {
    setIsSamePassword(password === passwordRepeat);
  }, [password, passwordRepeat]);

  useEffect(() => {
    if (username === "") {
      return setIsUsernameValid(true);
    }

    setIsUsernameValid(username.length >= 2 && username.length <= 72);
  }, [username]);

  useEffect(() => {
    if (email === "") {
      return setIsEmailValid(true);
    }

    setIsEmailValid(email.match(/^\S+@\S+\.\S+$/));
  }, [email]);

  useEffect(() => {
    if (
      (selfHosted && !serverAddress) ||
      (isServerLocked && (!inviteCode || !isInviteCodeValid))
    ) {
      return setCanSubmit(false);
    }

    setCanSubmit(
      !(
        !username ||
        !email ||
        !password ||
        !passwordRepeat ||
        !isPasswordComplexityOk ||
        !isServerValid ||
        !isSamePassword ||
        !isEmailValid ||
        !isUsernameValid ||
        (isPrivacyPolicyValid && !readPrivacy) ||
        (isTermsAndConditionsValid && !acceptTerms)
      )
    );
  }, [
    username,
    email,
    password,
    passwordRepeat,
    selfHosted,
    serverAddress,
    isServerValid,
    isServerLocked,
    inviteCode,
    isInviteCodeValid,
    isSamePassword,
    isEmailValid,
    isUsernameValid,
    readPrivacy,
    acceptTerms,
    isPrivacyPolicyValid,
    isTermsAndConditionsValid,
    isPasswordComplexityOk,
  ]);

  useEffect(() => {
    try {
      if (!selfHosted) {
        return;
      }

      const { origin } = new URL(serverAddressInput);

      dispatch(setServerUrl({ serverAddress: origin }));
    } catch (err) {}
  }, [dispatch, selfHosted, serverAddressInput]);

  return (
    <UnauthenticatedLayout>
      <div className="register-form">
        {showPlans && (
          <ArrowBackIcon
            className="back-icon"
            onClick={() =>
              showEmailVerify
                ? setShowEmailVerify(false)
                : history.push("/plans")
            }
          />
        )}
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
        {!showEmailVerify && (
          <form onSubmit={submitRegisterPerson}>
            <div className="register-form-input">
              <TextInput
                required
                autoFocus
                placeholder={t("global.username")}
                autoComplete="current-password"
                onChange={(value) => {
                  setUsernameIsUsed(false);
                  setEmailIsUsed(false);
                  setServerError(false);
                  setUsername(value);
                }}
                value={username}
                error={usernameIsUsed || !isUsernameValid}
                errorText={
                  isUsernameValid
                    ? t("screens.register.usernameInUse")
                    : t("screens.register.usernameNotValid")
                }
                maxLength={maxUsernameLength}
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
                error={emailIsUsed || !isEmailValid}
                errorText={
                  isEmailValid
                    ? t("screens.register.emailInUse")
                    : t("screens.register.emailNotValid")
                }
                maxLength={maxTextfieldLength}
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
                error={
                  (!isSamePassword &&
                    password !== "" &&
                    passwordRepeat !== "") ||
                  !isPasswordComplexityOk
                }
                errorText={
                  !isPasswordComplexityOk
                    ? t("screens.register.passwordsNotComplex")
                    : t("screens.register.passwordsDontMatch")
                }
                maxLength={maxTextfieldLength}
                minLength={8}
              />
              <PasswordComplexityIndicator
                password={password}
                complexity={passwordComplexity}
                setComplexity={setPasswordComplexity}
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
                error={
                  !isSamePassword && password !== "" && passwordRepeat !== ""
                }
                errorText={t("screens.register.passwordsDontMatch")}
                maxLength={maxTextfieldLength}
                minLength={8}
              />
              {isServerLocked && (
                <>
                  <TextInput
                    required
                    type="text"
                    placeholder={t("global.inviteCode")}
                    onChange={(value) => {
                      setInviteCode(value);
                    }}
                    value={inviteCode}
                    maxLength={8}
                    minLength={8}
                    showLengthIndicator={false}
                  />
                  <InviteCodeValidIndicator
                    inviteCode={inviteCode}
                    setValid={setIsInviteCodeValid}
                  />
                </>
              )}
              {selfHosted && !baseURL && (
                <TextInput
                  required
                  placeholder={t("global.server")}
                  onChange={(value) => {
                    setServerError(false);
                    setServerAddressInput(value);
                  }}
                  value={serverAddressInput}
                  maxLength={maxTextfieldLength}
                />
              )}
              {serverError ? (
                <p className="form-error">{t("global.serverNotResponding")}</p>
              ) : (
                <ServerValidIndicator
                  setValid={setIsServerValid}
                  setLocked={setIsServerLocked}
                  show={!baseURL}
                />
              )}

              {isPrivacyPolicyValid && (
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="privacy"
                    onChange={handleReadPrivacy}
                  />
                  <label className="label">
                    {privacyTextBefore}
                    <a target="_blank" href={privacyPolicyUrl} rel="noreferrer">
                      {privacyTextLink}
                    </a>
                    {privacyTextAfter}
                  </label>
                </div>
              )}

              {isTermsAndConditionsValid && (
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="terms"
                    onChange={handleAcceptTerms}
                  />
                  <label className="label">
                    {termsTextBefore}
                    <a
                      target="_blank"
                      href={termsAndConditionsUrl}
                      rel="noreferrer"
                    >
                      {termsTextLink}
                    </a>
                    {termsTextAfter}
                  </label>
                </div>
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
        )}
        {showEmailVerify && (
          <EmailVerify
            onNext={dispatchRegister.current}
            setUser={setUserData}
            serverInfo={serverInfo}
            user={userData}
          />
        )}
      </div>
    </UnauthenticatedLayout>
  );
};

export default Register;
