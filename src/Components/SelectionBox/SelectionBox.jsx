import React from "react";
import { useHistory } from "react-router-dom";

import CheckSign from "../../images/icons/check.png";
import Button from "../Button/Button";
import "./SelectionBox.scss";

function SelectionBox({ onSubmit, description, heading, image }) {
  const history = useHistory();

  function handleClick() {
    onSubmit();
    history.push("/login");
  }

  //iterate over array to create list items
  const items = description.map((item) => (
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
          <h1 className="select-box-header-heading-text">{heading}</h1>
        </div>
        <div className="select-box-header-logo">
          <img className="select-box-header-logo-img" src={image} alt="logo"></img>
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
