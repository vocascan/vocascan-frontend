import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Indicator from "../../Components/Indicators/PageIndicator/PageIndicator.jsx";

const SlideShow = ({ pages, onEnd, canContinue }) => {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    //close first startup when index is higher than pages length. WARNING: index starts at 0, length at 1, so === is used
    if (index === pages.length) {
      onEnd();
    }
  }, [index, onEnd, pages.length]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full h-5/6 overflow-auto flex justify-center items-center">
        {pages[index]}
      </div>
      <div className="h-[10%] max-h-12 flex flex-row justify-between ">
        <div
          className={`${index === 0 ? "pointer-events-none invisible" : ""}`}
        >
          <Button
            block
            uppercase
            variant={"outline"}
            onClick={() => setIndex(index - 1)}
          >
            {t("global.back")}
          </Button>
        </div>
        <div className="my-auto mx-0">
          <Indicator pageNumber={index} max={pages.length} />
        </div>
        <div className="bar-property">
          <Button
            block
            uppercase
            onClick={() => setIndex(index + 1)}
            disabled={!canContinue}
          >
            {index === pages.length - 1
              ? t("global.finish")
              : t("global.continue")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
