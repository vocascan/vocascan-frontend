import React, { useEffect, useState } from "react";

const calcProgress = (value, max, round) => {
  if (value > max) {
    return 100;
  }

  if (round) {
    return ((value / max) * 100).toFixed(0);
  }

  return (value / max) * 100;
};

const ProgressBar = ({
  showPercentage = false,
  value = 0,
  min = 0,
  max = 100,
  round = true,
  bottomText = false,
}) => {
  const [progress, setProgress] = useState(calcProgress(value, max, round));

  useEffect(() => {
    setProgress(calcProgress(value, max, round));
  }, [value, max, round]);

  return (
    <div className="w-5/6 h-5 max-w-lg relative self-end bg-background-muted md:w-full md:self-end">
      <div
        className="w-0 h-full max-w-lg bg-green-standard ease-in-out duration-1000 flex "
        style={{
          width: `${progress}%`,
        }}
      >
        {showPercentage && (
          <span className="absolute text-xs leading-3 text-mainText-standard font-bold left-1/2 translate-x-1/2 self-center">{`${progress}%`}</span>
        )}
      </div>
      {bottomText && (
        <div className="text-xs leading-3 text-mainText-standard flex justify-end py-1 px-0 tracking-wider">
          <span>{`${value} / ${max}`}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
