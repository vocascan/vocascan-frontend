import React from "react";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button.jsx";
import Modal from "../Modal/Modal.jsx";

import useDebounceCallback from "../../hooks/useDebounceCallback.js";

import "./ConfirmDialog.scss";

import {
  TouchBar,
  Button as TouchBarButton,
} from "@luwol03/react-touchbar-electron";

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

  const onCloseD = useDebounceCallback(onClose, 500);
  const onSubmitD = useDebounceCallback(onSubmit, 500);

  return (
    <>
      {show && (
        <TouchBar>
          {showAbortButton && (
            <TouchBarButton
              label={cancelText || t("global.abort")}
              backgroundColor="#727cf5"
              onClick={onCloseD}
            />
          )}
          <TouchBarButton
            label={submitText || t("global.delete")}
            backgroundColor="#ff586e"
            onClick={onSubmitD}
            enabled={canSubmit}
          />
        </TouchBar>
      )}

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
    </>
  );
};

export default ConfirmDialog;
