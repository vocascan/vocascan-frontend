import React from "react";
import { useHistory } from "react-router-dom";

import CheckSign from "../../images/icons/check.png";
import Button from "../Button/Button";
import "./SelectionBox.scss";

function SelectionBox(props) {
  //execute function on button click
  let history = useHistory();

  function handleClick() {
    history.push("/login");
    props.function();
  }

  //iterate over array to create list items
  const items = props.description.map((item) => (
    <li key={item.id} className="description-listItem">
      <img className="selectBox-header-logo-img" src={CheckSign} alt="checkbutton"></img>
      <p className="description-listItem-item" value={item.bulletPoint}>
        {item.bulletPoint}
      </p>
    </li>
  ));

  return (
    <div className="selectBox">
      <div className="selectBox-header">
        <div className="selectBox-header-heading">
          <h1 className="selectBox-header-heading-text">{props.heading}</h1>
        </div>
        <div className="selectBox-header-logo">
          <img className="selectBox-header-logo-img" src={props.image} alt="logo"></img>
        </div>
      </div>
      <div className="selectBox-description">
        <ul className="selectBox-description-ul">{items}</ul>
      </div>
      <div className="selectBox-footer">
        <Button block appearance="red" onClick={handleClick}>
          Start for free
        </Button>
      </div>
    </div>
  );
}

export default SelectionBox;
