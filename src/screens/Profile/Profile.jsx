import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import PersonIcon from "@material-ui/icons/Person";

import Button from "../../Components/Button/Button.jsx";

import { getStats } from "../../utils/api.js";

import "./Profile.scss";

import Table from "../../Components/Table/Table";

const Profile = () => {
  const { t } = useTranslation();
  const username = useSelector((state) => state.login.user.username);
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const serverAddress = useSelector((state) => state.login.serverAddress);
  const selfHosted = useSelector((state) => state.login.selfHosted);

  const [stats, setStats] = useState({});

  useEffect(() => {
    getProfileStats();
  });

  //make api call to login
  const getProfileStats = () => {
    getStats()
      .then((response) => {
        setError(false);

        //store stats in variables
        setStats(response.data);
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          setServerError(false);
          setError(true);
          return;
        }

        setServerError(true);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: t("screens.profile.stats.stats"),
        accessor: "stats", // accessor is the "key" in the data
      },
      {
        Header: t("global.packages"),
        accessor: "packages",
      },
      {
        Header: t("global.groups"),
        accessor: "groups",
      },
      {
        Header: t("global.vocabs"),
        accessor: "vocabs",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        stats: t("screens.profile.stats.total"),
        packages: stats.languagePackages,
        groups: stats.inactiveGroups + stats.activeGroups,
        vocabs: stats.inactiveVocabulary + stats.activeVocabulary,
      },
      {
        stats: t("screens.profile.stats.active"),
        packages: "-",
        groups: stats.activeGroups,
        vocabs: stats.activeVocabulary,
      },
      {
        stats: t("screens.profile.stats.inactive"),
        packages: "-",
        groups: stats.inactiveGroups,
        vocabs: stats.inactiveVocabulary,
      },
    ],
    [stats]
  );

  return (
    <div className="profile-screen">
      <div className="profile-avatar-wrapper">
        <PersonIcon className="profile-avatar" />
      </div>
      <h1 className="profile-username">{username}</h1>
      <Table columns={columns} data={data} pagination={false} />
      <h1 className="account-settings-header">
        {t("screens.profile.accountSettings.title")}
      </h1>
      <div className="account-settings">
        <div className="account-settings-fields border-bottom">
          <div className="description-wrapper">
            <h3>{t("screens.profile.accountSettings.password.title")}</h3>
            <p>{t("screens.profile.accountSettings.password.description")}</p>
          </div>
          <div className="button-wrapper">
            <Button block uppercase appearance="red">
              {t("screens.profile.accountSettings.password.title")}
            </Button>
          </div>
        </div>
        <div className="account-settings-fields border-bottom">
          <div className="description-wrapper">
            <h3>{t("screens.profile.accountSettings.email.title")}</h3>
            <p>{t("screens.profile.accountSettings.email.description")}</p>
          </div>
          <div className="button-wrapper">
            <Button block uppercase appearance="red">
              {t("screens.profile.accountSettings.email.title")}
            </Button>
          </div>
        </div>
        <div className="account-settings-fields">
          <div className="description-wrapper">
            <h3>{t("screens.profile.accountSettings.delete.title")}</h3>
            <p>{t("screens.profile.accountSettings.delete.description")}</p>
          </div>
          <div className="button-wrapper">
            <Button block uppercase appearance="red">
              {t("screens.profile.accountSettings.delete.title")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
