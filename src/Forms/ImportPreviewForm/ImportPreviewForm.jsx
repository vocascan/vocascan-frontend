import React from "react";

import GroupPreview from "./GroupPreview/GroupPreview.jsx";
import PackagePreview from "./PackagePreview/PackagePreview.jsx";

import "./ImportPreviewForm.scss";

const ImportPreviewForm = ({ data }) => {
  return (
    <div className="import-preview">
      {data.foreignWordLanguage ? (
        <PackagePreview data={data} />
      ) : (
        <GroupPreview data={data} />
      )}
    </div>
  );
};

export default ImportPreviewForm;
