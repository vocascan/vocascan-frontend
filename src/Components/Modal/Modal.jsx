import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";

import CloseIcon from "@material-ui/icons/Close";

import Button from "../Button/Button.jsx";

const Modal = ({
  title,
  onClose,
  size = "", // small, large, maxed, ""
  open = false,
  renderClose = true,
  closeOnEscape = true,
  closeOnClickOutside = false,
  children,
}) => {
  const ref = useRef(null);

  const modalLayoutClasses = clsx(
    size === "" && "w-3/5 h-3/5",
    size === "small" && "w-2/4 max-w-lg h-auto",
    size === "large" && "w-4/5 h-4/5",
    size === "maxed" && "w-full h-screen"
  );

  const escapeListener = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeOnEscape && onClose?.();
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
    <div className="w-full h-screen bg-background-modal z-50 flex justify-center absolute left-0 top-0">
      <div
        className={`relative m-auto bg-white z-11 py-10 px-16 flex flex-col justify-between items-center border rounded overflow-y-auto ${modalLayoutClasses}`}
        ref={ref}
      >
        {renderClose && (
          <Button
            tabIndex={-1}
            appearance="primary"
            variant="transparent"
            onClick={onClose}
            className="bg-primary-standard absolute top-5 right-5 rounded-full p-2.5 hover:bg-primary-dark cursor-pointer"
          >
            <CloseIcon />
          </Button>
        )}
        {title && <h1 className="uppercase text-2xl mt-5">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
