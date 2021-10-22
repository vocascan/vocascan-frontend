import React, { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Select from "../../Components/Form/Select/Select.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";

import useHumanizer from "../../hooks/useHumanizer.js";
import useSnack from "../../hooks/useSnack.js";
import { createInviteCode } from "../../utils/api.js";
import { numberField } from "../../utils/constants.js";
import { inviteTimeSpans } from "../../utils/constants.js";

import "./InviteCodeForm.scss";

const InviteCodeForm = ({ onSubmitCallback = null }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const { durationHumanizer } = useHumanizer(t);

  const timeSpans = useMemo(
    () =>
      inviteTimeSpans.map((duration) => ({
        value: duration,
        label: duration
          ? durationHumanizer({ duration })
          : t("components.inviteCode.never"),
      })),
    [durationHumanizer, t]
  );

  const [maxUses, setMaxUses] = useState(null);
  const [expirationDate, setExpirationDate] = useState(
    timeSpans.find(({ value }) => value === 1 * 24 * 60 * 60)
  );

  // make api call to add vocab package
  const submitHandler = useCallback(async () => {
    let tempDate = null;
    if (expirationDate.value) {
      tempDate = new Date();
      tempDate.setSeconds(tempDate.getSeconds() + expirationDate.value);
      tempDate.setMilliseconds(0);
    }

    createInviteCode({
      maxUses,
      expirationDate: tempDate?.toISOString() || null,
    })
      .then(({ data }) => {
        onSubmitCallback(data);
        showSnack(
          "success",
          t("components.inviteCode.inviteCodeSuccessMessage")
        );
      })
      .catch((error) => {
        showSnack("success", t("components.inviteCode.inviteCodeErrorMessage"));
      });

    return;
  }, [expirationDate.value, maxUses, onSubmitCallback, showSnack, t]);

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
            menuPosition="fixed"
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
