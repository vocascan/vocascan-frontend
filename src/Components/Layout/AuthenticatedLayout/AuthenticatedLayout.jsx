import React from "react";

import Nav from "../../Nav/Nav.jsx";
import TopNav from "../../Nav/TopNav.jsx";

import "./AuthenticatedLayout.scss";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="root">
      <Nav />
      <TopNav />
      <div className="content">{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;
