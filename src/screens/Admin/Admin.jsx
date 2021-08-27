import React from "react";
import { useTranslation } from "react-i18next";

import "./Admin.scss";

const Admin = () => {
  const { t } = useTranslation();

  return (
    <div className="admin">
      <h1>Admin Page</h1>
    </div>
  );
};

export default Admin;
