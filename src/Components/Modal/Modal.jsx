import React, { useCallback, useEffect, useRef } from "react";

import CloseIcon from "@material-ui/icons/Close";

import Button from "../Button/Button.jsx";

import "./Modal.scss";

const Modal = ({
  title,
  onClose,
  xxl = false,
  open = false,
  renderClose = true,
  closeOnClickOutside = false,
  children,
}) => {
  const ref = useRef(null);

  const escapeListener = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    },
    // Modal specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const clickListener = useCallback(
    (e) => {
      if (!ref.current?.contains(e.target)) {
        onClose?.();
      }
    },
    // Modal specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (closeOnClickOutside) {
      document.addEventListener("click", clickListener);

      return () => {
        document.removeEventListener("click", clickListener);
      };
    }
    // Modal specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOnClickOutside]);

  useEffect(() => {
    document.addEventListener("keyup", escapeListener);
    return () => {
      document.removeEventListener("keyup", escapeListener);
    };
    // Modal specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className={`inner ${xxl ? "xxl" : ""}`} ref={ref}>
        {renderClose && (
          <Button
            tabIndex={-1}
            appearance="primary"
            variant="transparent"
            onClick={onClose}
            className="close"
          >
            <CloseIcon />
          </Button>
        )}
        {title && <h1 className="heading">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
