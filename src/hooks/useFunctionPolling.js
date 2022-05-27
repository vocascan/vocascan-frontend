import { useEffect } from "react";

export const useFunctionPolling = (fn) => {
  useEffect(() => {
    const run = () => {
      if (!fn()) {
        setTimeout(run, 200);
      }
    };

    run();
  }, [fn]);
};
