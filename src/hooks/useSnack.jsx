import { useContext } from "react";

import SnackbarContext from "../context/SnackbarContext";

const useSnack = () => {
  const { showSnack } = useContext(SnackbarContext);

  return {
    showSnack,
  };
};

export default useSnack;
