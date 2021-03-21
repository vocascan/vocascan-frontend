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
    <li key={item.id} className="description-list-item">
      <img className="select-box-header-logo-img" src={CheckSign} alt="checkbutton"></img>
      <p className="description-list-item-item" value={item.bulletPoint}>
        {item.bulletPoint}
      </p>
    </li>
  ));

  return (
    <div className="select-box">
      <div className="select-box-header">
        <div className="select-box-header-heading">
          <h1 className="select-box-header-heading-text">{props.heading}</h1>
        </div>
        <div className="select-box-header-logo">
          <img className="select-box-header-logo-img" src={props.image} alt="logo"></img>
        </div>
      </div>
      <div className="select-box-description">
        <ul className="select-box-description-ul">{items}</ul>
      </div>
      <div className="select-box-footer">
        <Button block appearance="red" onClick={handleClick}>
          Start for free
        </Button>
      </div>
    </div>
  );
}

export default SelectionBox;
