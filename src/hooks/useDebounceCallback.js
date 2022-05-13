import { useEffect, useRef } from "react";

const useDebounceCallback = (callback, delay) => {
  const latestCallback = useRef();
  const latestExecutionTime = useRef(-Infinity);

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return () => {
    if (latestExecutionTime.current < Date.now() - delay) {
      latestCallback.current?.();
      latestExecutionTime.current = Date.now();
    }
  };
};

export default useDebounceCallback;
