import React from "react";

import DirectionBox from "../../../Components/DirectionBox/DirectionBox.jsx";

import "./Direction.scss";

const Direction = () => {
  return (
    <div className="direction">
      <h1 className="box-title">Please choose your direction</h1>
      <div className="box-wrapper">
        <DirectionBox />
        <DirectionBox direction="backwards" />
        <DirectionBox direction="random" />
      </div>
    </div>
  );
};

export default Direction;
