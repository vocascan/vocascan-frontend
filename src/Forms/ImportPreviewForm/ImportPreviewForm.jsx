import React from "react";

import GroupPreview from "./GroupPreview/GroupPreview.jsx";
import PackagePreview from "./PackagePreview/PackagePreview.jsx";

const ImportPreviewForm = ({
  defaultPackage = null,
  onSubmitCallback = null,
  importedData,
}) => {
  return (
    <div className="h-5/6 w-5/6">
      {importedData.type === "vocascan/package" ? (
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
