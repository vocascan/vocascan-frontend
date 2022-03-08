import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";

const ConfirmDialog = ({
  title = null,
  description = null,
  onSubmit = null,
  submitText,
  cancelText,
  onClose = null,
  show = false,
  canSubmit = true,
  showAbortButton = true,
  children,
}) => {
  const [t] = useTranslation();

  return (
    <Modal size="small" title={title} open={show} onClose={onClose} xxl>
      <div className="w-4/5 max-w-sm flex flex-col">
        <div className="py-5 px-0">
          <span>{description}</span>
          {children}
        </div>
        <div className="flex justify-between items-center">
          {showAbortButton && (
            <Button onClick={onClose} appearance="primary">
              {cancelText || t("global.abort")}
            </Button>
          )}
          <Button
            disabled={!canSubmit}
            onClick={onSubmit}
            appearance="red"
            block={!showAbortButton}
          >
            {submitText || t("global.delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
