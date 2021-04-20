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
}) => {
  const [t] = useTranslation();

  return (
    <Modal size="small" title={title} open={show} onClose={onClose} xxl>
      <div className="submit-dialog">
        <div className="description">
          <span>{description}</span>
        </div>
        <div className="actions">
          <Button onClick={onClose} appearance="primary">
            {cancelText || t("global.abort")}
          </Button>
          <Button onClick={onSubmit} appearance="red">
            {submitText || t("global.delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
