import React from "react";
import { useHistory } from "react-router-dom";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import Button from "../Button/Button";
import "./SelectionBox.scss";

const Item = ({ Icon, text }) => (
  <li className="description-list-item">
    <Icon className="select-box-header-logo-img" />
    <p className="description-list-item-item">{text}</p>
  </li>
);

function SelectionBox({ onSubmit, pro, contra, heading, image, buttonText }) {
  const history = useHistory();

  function handleClick() {
    onSubmit();
    history.push("/login");
  }

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
        <ul className="select-box-description-ul">
          {pro.map((text, i) => (
            <Item text={text} Icon={CheckIcon} key={i} />
          ))}
          {contra.map((text, i) => (
            <Item text={text} Icon={CloseIcon} key={i} />
          ))}
        </ul>
      </div>
      <div className="select-box-footer">
        <Button block appearance="red" onClick={handleClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default SelectionBox;
