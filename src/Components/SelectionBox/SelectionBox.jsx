import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import Button from "../Button/Button.jsx";

import "./SelectionBox.scss";

const Item = ({ Icon, text }) => (
  <li className="description-list-item">
    <Icon className="select-box-header-logo-img" />
    <p className="description-list-item-item">{text}</p>
  </li>
);

const SelectionBox = ({
  onSubmit,
  pro,
  contra,
  heading,
  image,
  buttonText,
  disabled = false,
  important = false,
}) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    onSubmit();
    history.push("/login");
  }, [history, onSubmit]);

  return (
    <div className="select-box">
      <div className="select-box-header">
        <div
          className={`select-box-header-heading ${
            important ? "important" : ""
          }`}
        >
          <h1 className="select-box-header-heading-text">{heading}</h1>
        </div>
        <div className="select-box-header-logo">
          <img
            className="select-box-header-logo-img"
            src={image}
            alt="logo"
          ></img>
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
        <Button
          block
          appearance={`${important ? "red" : "dark"}`}
          onClick={handleClick}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SelectionBox;
