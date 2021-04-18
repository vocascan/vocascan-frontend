import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import SnackbarContext from "../context/SnackbarContext";

const useSnack = () => {
  const { t } = useTranslation();
  const { setSnack } = useContext(SnackbarContext);

  const showSnack = useCallback(
    (variant = "success", text = t("global.successMessage")) => {
      setSnack({
        show: true,
        variant,
        text,
      });
    },
    [setSnack, t]
  );

  return {
    showSnack,
  };
};

export default useSnack;
