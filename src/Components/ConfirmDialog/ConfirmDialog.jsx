import React from "react";
import { useTranslation } from "react-i18next";

import "./ConfirmDialog.scss";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

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
            {cancelText ? cancelText : t("global.abort")}
          </Button>
          <Button onClick={onSubmit} appearance="red">
            {submitText ? submitText : t("global.delete")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
