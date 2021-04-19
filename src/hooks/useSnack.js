import { useContext } from "react";

import SnackbarContext from "../context/SnackbarContext.jsx";

const useSnack = () => {
  const { showSnack } = useContext(SnackbarContext);

  return {
    showSnack,
  };
};

export default useSnack;
