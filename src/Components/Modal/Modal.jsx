import React, { useCallback, useEffect, useRef } from "react";

import CloseIcon from "@material-ui/icons/Close";

import "./Modal.scss";

const Modal = ({
  title,
  onClose,
  open = false,
  renderClose = true,
  closeOnClickOutside = true,
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
      document.addEventListener("keyup", escapeListener);

      return () => {
        document.removeEventListener("click", clickListener);
        document.removeEventListener("keyup", escapeListener);
      };
    }
    // Modal specific dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOnClickOutside]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className="inner" ref={ref}>
        {renderClose && <CloseIcon className="close" onClick={onClose} />}
        {title && <h1 className="heading">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
