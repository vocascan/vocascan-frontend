import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Select from "../../Components/Form/Select/Select.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";

import useSnack from "../../hooks/useSnack.js";
import { createInviteCode } from "../../utils/api.js";
import { numberField } from "../../utils/constants.js";
import { timeSpans } from "../../utils/constants.js";

import "./InviteCodeForm.scss";

const InviteCodeForm = ({ onSubmitCallback = null }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [maxUses, setMaxUses] = useState(null);
  const [expirationDate, setExpirationDate] = useState(
    timeSpans.find(
      (timeSpan) => timeSpan.value === 1 && timeSpan.format === "d"
    )
  );

  //make api call to add vocab package
  const submitHandler = useCallback(async () => {
    let tempDate = new Date();
    switch (expirationDate.format) {
      case "m":
        tempDate.setMinutes(tempDate.getMinutes() + expirationDate.value);
        break;
      case "h":
        tempDate.setHours(tempDate.getHours() + expirationDate.value);
        break;
      case "d":
        tempDate.setDate(tempDate.getDate() + expirationDate.value);
        break;
      default:
        return;
    }
    createInviteCode({ maxUses, expirationDate: tempDate.toISOString() })
      .then(({ data }) => {
        onSubmitCallback();
        showSnack(
          "success",
          t("components.inviteCode.inviteCodeSuccessMessage")
        );
      })
      .catch((error) => {
        showSnack("success", t("components.inviteCode.inviteCodeErrorMessage"));
      });

    return;
  }, [
    expirationDate?.format,
    expirationDate?.value,
    maxUses,
    onSubmitCallback,
    showSnack,
    t,
  ]);

  return (
    <form className="invite-code-form" onSubmit={submitHandler}>
      <div className="form-wrapper">
        <TextInput
          placeholder={t("components.inviteCode.maxUses")}
          onChange={(value) => {
            setMaxUses(value);
          }}
          value={maxUses ? maxUses : ""}
          type="number"
          max={numberField[1]}
          min={numberField[0]}
        />
        <div className="select-wrapper">
          <Select
            required
            label={t("components.inviteCode.expirationDateNormal")}
            options={timeSpans}
            onChange={(value) => {
              setExpirationDate(value);
            }}
            value={expirationDate}
          />
        </div>
        <Button className="submit-btn" type="submit">
          {t("global.create")}
        </Button>
      </div>
    </form>
  );
};

export default InviteCodeForm;
