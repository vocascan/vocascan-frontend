import { useCallback } from "react";

const useHumanizer = (t) => {
  const durationHumanizer = useCallback(
    ({ duration }) => {
      // inspired from https://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
      const durations = [
        ["years", Math.floor(duration / 31536000)],
        ["weeks", Math.floor((duration % 31536000) / 86400 / 7)],
        ["days", Math.floor(((duration % 31536000) % 604800) / 86400)],
        ["hours", Math.floor(((duration % 31536000) % 86400) / 3600)],
        ["minutes", Math.floor((((duration % 31536000) % 86400) % 3600) / 60)],
        ["seconds", (((duration % 31536000) % 86400) % 3600) % 60],
      ];

      const outputString = durations.reduce((str, [unit, value]) => {
        if (value > 0) {
          return `${str} ${t(`units.time.${unit}`, { count: value })}`;
        }

        return str;
      }, "");

      return outputString;
    },
    [t]
  );

  return {
    durationHumanizer,
  };
};

export default useHumanizer;
