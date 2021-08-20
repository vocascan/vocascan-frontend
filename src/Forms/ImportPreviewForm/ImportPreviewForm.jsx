import React from "react";

import GroupPreview from "./GroupPreview/GroupPreview.jsx";
import PackagePreview from "./PackagePreview/PackagePreview.jsx";

import "./ImportPreviewForm.scss";

const ImportPreviewForm = ({ importedData }) => {
  return (
    <div className="import-preview">
      {importedData.foreignWordLanguage ? (
        <GroupPreview importedData={importedData} />
      ) : (
        <PackagePreview importedData={importedData} />
      )}
    </div>
  );
};

export default ImportPreviewForm;
