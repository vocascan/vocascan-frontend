import React from "react";

import GroupPreview from "./GroupPreview/GroupPreview.jsx";
import PackagePreview from "./PackagePreview/PackagePreview.jsx";

import "./ImportPreviewForm.scss";

const ImportPreviewForm = ({
  defaultPackage = null,
  onSubmitCallback = null,
  importedData,
}) => {
  return (
    <div className="import-preview">
      {importedData.foreignWordLanguage ? (
        <PackagePreview
          onSubmitCallback={onSubmitCallback}
          importedData={importedData}
        />
      ) : (
        <GroupPreview
          defaultPackage={defaultPackage}
          onSubmitCallback={onSubmitCallback}
          importedData={importedData}
        />
      )}
    </div>
  );
};

export default ImportPreviewForm;
