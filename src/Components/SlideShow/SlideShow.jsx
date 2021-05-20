import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Indicator from "../../Components/Indicators/PageIndicator/PageIndicator.jsx";
import GuideContext from "../../context/GuideContext.jsx";

import "./SlideShow.scss";

const SlideShow = ({ pages, onEnd }) => {
  const { t } = useTranslation();
  const { canContinue } = useContext(GuideContext);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    //close first startup when index is higher than pages length. WARNING: index starts at 0, length at 1, so === is used
    if (index === pages.length) {
      onEnd();
    }
  }, [index, onEnd, pages.length]);

  return (
    <div className="slideshow">
      <div className="slideshow-content">{pages[index]}</div>
      <div className="slideshow-bar">
        <div className={`bar-property ${index === 0 ? "invisible" : ""}`}>
          <Button
            block
            uppercase
            variant={"outline"}
            onClick={() => setIndex(index - 1)}
          >
            {t("global.back")}
          </Button>
        </div>
        <div className="bar-property indicator">
          <Indicator activeState={index} max={pages.length} />
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
