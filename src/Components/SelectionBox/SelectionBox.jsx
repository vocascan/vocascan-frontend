import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import Button from "../Button/Button.jsx";

const Item = ({ Icon, text }) => (
  <li className="flex my-1 mx-0">
    <Icon className="w-[5%] mr-3 object-scale-down" />
    <p className="w-4/5 text-left">{text}</p>
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
    <div className="min-w-[300px] max-w-sm h-full my-0 mx-5 flex flex-col justify-between rounded-xl bg-white shadow-2xl">
      <div className="flex flex-col">
        <div
          className={`bg-background-inverse rounded-t-xl p-5 flex justify-center ${
            important ? "bg-red-standard" : ""
          }`}
        >
          <h1 className="text-white text-xl m-auto">{heading}</h1>
        </div>
        <div className="w-full py-5 mx-0 flex justify-center">
          <img className="w-2/5 m-auto" src={image} alt="logo"></img>
        </div>
      </div>
      <div className="w-full py-5 px-0 min-h-[200px]">
        <ul className="w-full h-full pl-[10%]">
          {(typeof pro === "string" ? [pro] : pro).map((text, i) => (
            <Item text={text} Icon={CheckIcon} key={i} />
          ))}
          {(typeof contra === "string" ? [contra] : contra).map((text, i) => (
            <Item text={text} Icon={CloseIcon} key={i} />
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-stretch p-5">
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
