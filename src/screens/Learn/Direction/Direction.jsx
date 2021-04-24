import React from "react";

import DirectionBox from "../../../Components/DirectionBox/DirectionBox.jsx";

import "./Direction.scss";

const Direction = () => {
  return (
    <div className="direction">
      <h1>Please choose your direction</h1>
      <div className="box-wrapper">
        <DirectionBox />
        <DirectionBox />
        <DirectionBox />
      </div>
    </div>
  );
};

export default Direction;
