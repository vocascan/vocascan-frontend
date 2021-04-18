import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { StarsTwoTone } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";

import { getStats } from "../../utils/api.js";

import "./Profile.scss";

import Table from "../../Components/Table/Table";

const Profile = () => {
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
        Header: "Stats",
        accessor: "stats", // accessor is the "key" in the data
      },
      {
        Header: "Packages",
        accessor: "packages",
      },
      {
        Header: "Groups",
        accessor: "groups",
      },
      {
        Header: "Vocabs",
        accessor: "vocabs",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        stats: "Total",
        packages: stats.languagePackages,
        groups: stats.inactiveGroups + stats.activeGroups,
        vocabs: stats.inactiveVocabulary + stats.activeVocabulary,
      },
      {
        stats: "Active",
        packages: "-",
        groups: stats.activeGroups,
        vocabs: stats.activeVocabulary,
      },
      {
        stats: "Inactive",
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
    </div>
  );
};

export default Profile;
