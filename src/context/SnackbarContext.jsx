import React, { createContext, useEffect, useState } from "react";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    show: false,
    varian: "",
    text: "",
  });

  useEffect(() => {
    if (!snack.show) {
      return;
    }

    const timer = setTimeout(() => {
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
    setSnack,
  };

  return (
    <SnackbarContext.Provider value={providerValue}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
