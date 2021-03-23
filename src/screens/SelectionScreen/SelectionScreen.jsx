import React from "react";
import { useDispatch } from "react-redux";

import SelectionBox from "../../Components/SelectionBox/SelectionBox.jsx";
import UnauthenticatedLayout from "../../Components/Layout/UnauthenticatedLayout/UnauthenticatedLayout.jsx";

import { setSelfHosted } from "../../redux/Actions/login.js";

import Image from "../../images/vocascan-server-logo-small.png";
import "./SelectionScreen.scss";

const SelectionScreen = () => {
  let primary = [
    { id: 0, bulletPoint: "No need of a server" },
    { id: 1, bulletPoint: "sync every device" },
  ];

  let secondary = [
    { id: 0, bulletPoint: "Use your own Server" },
    { id: 1, bulletPoint: "Full controll over the settings" },
  ];
  //dispatch to set Server address in redux
  const dispatch = useDispatch();

  function handleSubmit(selfHosted) {
    dispatch(setSelfHosted({ selfHosted }));
  }

  return (
    <UnauthenticatedLayout>
      <div className="select-srn-wrapper">
        <div className="select-srn-header-wrapper">
          <h1 className="select-srn-title">LOG IN</h1>
          <h1 className="select-srn-heading">SELECT YOUR OPTION</h1>
        </div>
        <div className="boxes">
          <SelectionBox
            heading="Vocascan Server"
            description={primary}
            image={Image}
            onSubmit={() => handleSubmit(false)}
          />
          <SelectionBox
            heading="Own Server"
            description={secondary}
            image={Image}
            onSubmit={() => handleSubmit(true)}
          />
        </div>
      </div>
    </UnauthenticatedLayout>
  );
};

export default SelectionScreen;
