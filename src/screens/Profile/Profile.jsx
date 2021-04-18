import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable } from "react-table";

import { StarsTwoTone } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";

import { getStats } from "../../utils/api.js";

import "./Profile.scss";

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

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="profile-screen">
      <div className="profile-avatar-wrapper">
        <PersonIcon className="profile-avatar" />
      </div>
      <h1 className="profile-username">{stats.languagePackages}</h1>
      <table className="stats-table" {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
