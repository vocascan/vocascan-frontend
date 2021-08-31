import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Select from "../../Components/Form/Select/Select.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";

import useSnack from "../../hooks/useSnack.js";
import { createInviteCode } from "../../utils/api.js";
import { numberField } from "../../utils/constants.js";

import "./InviteCodeForm.scss";

const InviteCodeForm = ({ onSubmitCallback = null }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [maxUses, setMaxUses] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const timeSpans = [
    {
      value: -1,
      label: "never",
    },
    {
      value: 1,
      label: "1 Day",
    },
    {
      value: 7,
      label: "7 Days",
    },
  ];

  //make api call to add vocab package
  const submitHandler = useCallback(async () => {
    let tempDate = new Date();
    tempDate.setDate(tempDate.getDate() + expirationDate.value);
    createInviteCode(maxUses, tempDate)
      .then(({ data }) => {
        onSubmitCallback();
        showSnack("success", "Created invite code");
      })
      .catch((error) => {
        showSnack("success", "Error creating invite code");
      });

    return;
  }, [expirationDate.value, maxUses, onSubmitCallback, showSnack]);

  return (
    <form className="invite-code-form" onSubmit={submitHandler}>
      <div className="form-wrapper">
        <TextInput
          placeholder={"max Uses"}
          onChange={(value) => {
            setMaxUses(value);
          }}
          value={maxUses ? maxUses : ""}
          type="number"
          max={numberField[1]}
          min={numberField[0]}
        />

        <div className="dropdown">
          <div className="select-wrapper">
            <Select
              required
              label={"Expiration date"}
              options={timeSpans}
              onChange={(value) => {
                console.log(value);
                setExpirationDate(value);
              }}
              value={expirationDate}
            />
          </div>
        </div>
      </div>

      <Button type="submit">{t("global.submit")}</Button>
    </form>
  );
};

export default InviteCodeForm;
