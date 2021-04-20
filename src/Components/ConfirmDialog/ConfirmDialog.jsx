import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";

import "./ConfirmDialog.scss";

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
      <div className="submit-dialog">
        <div className="description">
          <span>{description}</span>
          {children}
        </div>
        <div className="actions">
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
