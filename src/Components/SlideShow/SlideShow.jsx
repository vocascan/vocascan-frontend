import React, { useState, useEffect } from "react";

import Button from "../../Components/Button/Button.jsx";
import Indicator from "../../Components/Indicators/PageIndicator/PageIndicator.jsx";

import "./SlideShow.scss";

const SlideShow = ({ pages, onEnd }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    //close first startup when index is higher than pages length. WARNING: index starts at 0, length at 1, so === is used
    if (index === pages.length) {
      onEnd();
    }
  }, [index, onEnd, pages.length]);

  return (
    <div className="slideshow">
      {pages[index]}
      <div className="slideshow-bar">
        <div className={`bar-property ${index === 0 ? "invisible" : ""}`}>
          <Button block uppercase onClick={() => setIndex(index - 1)}>
            Continue
          </Button>
        </div>
        <div className="bar-property indicator">
          <Indicator activeState={index} max={pages.length} />
        </div>
        <div className="bar-property">
          <Button block uppercase onClick={() => setIndex(index + 1)}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
