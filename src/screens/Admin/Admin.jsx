import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "./Admin.scss";

import InviteCode from "../../Components/InviteCode/InviteCode";
import { getInviteCodes } from "../../utils/api";

const Admin = () => {
  const { t } = useTranslation();
  const [inviteCodes, setInviteCodes] = useState([]);

  useEffect(() => {
    getInviteCodes()
      .then((res) => {
        setInviteCodes(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
  }, []);

  return (
    <div className="admin">
      <h1>Admin Page</h1>
      <div className="invite-code-field">
        {inviteCodes.map((inviteCode) => (
          <InviteCode data={inviteCode} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
