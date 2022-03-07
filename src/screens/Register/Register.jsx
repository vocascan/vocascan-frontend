import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Button from "../../Components/Button/Button.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";
import InviteCodeValidIndicator from "../../Components/Indicators/InviteCodeValidIndicator/InviteCodeValidIndicator.jsx";
import ServerValidIndicator from "../../Components/Indicators/ServerValidIndicator/ServerValidIndicator.jsx";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";

import useLinkCreator from "../../hooks/useLinkCreator.js";
import { setLanguages } from "../../redux/Actions/language.js";
import { setServerUrl, register } from "../../redux/Actions/login.js";
import { register as registerAPI, getLanguages } from "../../utils/api.js";
import {
  maxTextfieldLength,
  maxUsernameLength,
  pages,
} from "../../utils/constants.js";

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

      registerAPI(
        {
          username,
          email,
          password,
        },
        isServerLocked ? inviteCode : null
      )
        .then((response) => {
          dispatch(
            register({
              username: response.data.user.username,
              email,
              token: response.data.token,
              isAdmin: response.data.user.isAdmin,
            })
          );
          //fetch languages from server
          fetchLanguages();
        })
        .catch((error) => {
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
        });
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
      <div className="max-w-md max-h-[750px] m-auto rounded-xl relative flex flex-col justify-around py-10 px-24 bg-white shadow-2xl">
        {showPlans && (
          <ArrowBackIcon
            className="text-primary-standard absolute top-5 left-5 hover:cursor-pointer hover:text-primary-dark-standard"
            onClick={() => history.push("/plans")}
          />
        )}
        <div className="w-full h-1/3">
          <img
            className="w-24 h-auto mb-3 mx-auto"
            src={image}
            alt="server-logo"
          />
          <h1 className="uppercase text-2xl">{t("screens.register.title")}</h1>
        </div>
        <form onSubmit={submitRegisterPerson}>
          <div className="w-full min-w-[250px] my-7 mx-auto flex flex-col justify-around">
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
                !isSamePassword && password !== "" && passwordRepeat !== ""
              }
              errorText={t("screens.register.passwordsDontMatch")}
              maxLength={maxTextfieldLength}
              minLength={8}
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
              <p className="text-left pt-3 text-xs text-red-standard">
                {t("global.serverNotResponding")}
              </p>
            ) : (
              <ServerValidIndicator
                setValid={setIsServerValid}
                setLocked={setIsServerLocked}
                show={!baseURL}
              />
            )}

            {isPrivacyPolicyValid && (
              <div className="text-left text-sm my-1 mx-0">
                <input
                  type="checkbox"
                  name="privacy"
                  onChange={handleReadPrivacy}
                />
                <label className="ml-1">
                  {privacyTextBefore}
                  <a
                    className="no-underline text-primary-standard hover:underline"
                    target="_blank"
                    href={privacyPolicyUrl}
                    rel="noreferrer"
                  >
                    {privacyTextLink}
                  </a>
                  {privacyTextAfter}
                </label>
              </div>
            )}

            {isTermsAndConditionsValid && (
              <div className="text-left text-sm my-1 mx-0">
                <input
                  type="checkbox"
                  name="terms"
                  onChange={handleAcceptTerms}
                />
                <label className="ml-1">
                  {termsTextBefore}
                  <a
                    className="no-underline text-primary-standard hover:underline"
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
          <div className="flex flex-col justify-center">
            <Button
              block
              uppercase
              onClick={submitRegisterPerson}
              disabled={!canSubmit}
            >
              {t("global.signUp")}
            </Button>

            <div className="flex flex-row justify-center text-sm mt-3">
              {t("screens.register.alreadyHaveAccount")}{" "}
              <div
                className="text-primary-standard cursor-pointer ml-1"
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
