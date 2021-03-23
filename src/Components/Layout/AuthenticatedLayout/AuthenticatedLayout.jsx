import React from "react";

import Nav from "Components/Nav/Nav.jsx";
import TopNav from "Components/Nav/TopNav.jsx";

import "./AuthenticatedLayout.scss";

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="root">
      <Nav />
      <TopNav />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
