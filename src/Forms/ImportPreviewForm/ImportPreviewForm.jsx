import React from "react";

import GroupPreview from "./GroupPreview/GroupPreview.jsx";
import PackagePreview from "./PackagePreview/PackagePreview.jsx";

import "./ImportPreviewForm.scss";

const ImportPreviewForm = ({ importedData }) => {
  return (
    <div className="import-preview">
      {importedData.foreignWordLanguage ? (
        <PackagePreview importedData={importedData} />
      ) : (
        <GroupPreview importedData={importedData} />
      )}
    </div>
  );
};

export default ImportPreviewForm;
