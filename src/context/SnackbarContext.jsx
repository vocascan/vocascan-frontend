import React, { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const { t } = useTranslation();

  const [snack, setSnack] = useState({
    show: false,
    varian: "",
    text: "",
  });

  const showSnack = useCallback(
    (variant = "success", text = t("global.successMessage")) => {
      setSnack({
        show: true,
        variant,
        text,
      });
    },
    [t]
  );

  useEffect(() => {
    if (!snack.show) {
      return;
    }

    let timer = setTimeout(() => {
      setSnack((s) => {
        return {
          ...s,
          show: false,
        };
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [snack]);

  const providerValue = {
    snack,
    showSnack,
  };

  return (
    <SnackbarContext.Provider value={providerValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
