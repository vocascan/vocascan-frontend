import React, { useMemo, useState } from "react";
import { useEffect } from "react";

import {
  languageCountryMap,
  spriteSheetPositions,
} from "./language-country-map.js";

import "./Flag.scss";

const sizeMap = {
  small: 0.13,
  medium: 0.3,
  large: 0.6,
};

const Flag = ({ languageCode, border = false, size = "small", scale }) => {
  const [computedScale, setComputedScale] = useState(0);

  useEffect(() => {
    if (scale) {
      setComputedScale(scale);
    } else if (size && sizeMap[size]) {
      setComputedScale(sizeMap[size]);
    } else {
      setComputedScale(sizeMap.small);
    }
  }, [scale, size]);

  const style = useMemo(() => {
    let code = "unknown";

    if (Object.keys(spriteSheetPositions).includes(languageCode)) {
      code = languageCode;
    } else if (languageCountryMap[languageCode]) {
      code = languageCountryMap[languageCode];
    }

    return {
      width: 200 * computedScale,
      height: 150 * computedScale,
      backgroundSize: `${3300 * computedScale}px ${3060 * computedScale}px`,
      backgroundPosition: spriteSheetPositions[code]
        .map((x) => `${x * computedScale}px`)
        .join(" "),
      borderRadius: `${30 * computedScale}px`,
      boxShadow: border ? `0 0 0 ${10 * computedScale}px` : "none",
    };
  }, [border, computedScale, languageCode]);

  return (
    <div className="flag">
      <span style={style} />
    </div>
  );
};

export default Flag;
