import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../Components/Button/Button.jsx";
import Select from "../../Components/Form/Select/Select.jsx";
import Switch from "../../Components/Form/Switch/Switch.jsx";
import TextInput from "../../Components/Form/TextInput/TextInput.jsx";
import SnackbarContext from "../../context/SnackbarContext.jsx";

import { getPackages, createGroup } from "../../utils/api.js";
import { languages } from "../../utils/constants.js";

import "./GroupForm.scss";

const GroupForm = ({
  fixedPackage = false,
  selectedPackage = null,
  onSubmitCallback = null,
}) => {
  const { t } = useTranslation();
  const { showSnack } = useContext(SnackbarContext);

  const [name, setName] = useState("");
  const [languagePackage, setLanguagePackage] = useState(selectedPackage);
  const [canSubmit, setCanSubmit] = useState(false);
  const [active, setActive] = useState(false);
  const [languagePackages, setLanguagePackages] = useState([]);
  const [packageItems, setPackageItems] = useState([]);

  const fetchPackages = useCallback(() => {
    getPackages(true)
      .then(({ data }) => {
        setLanguagePackages(data);
      })
      .catch((err) => {
        showSnack("error", t("global.fetchError"));
      });
  }, [showSnack, t]);

  const submitHandler = useCallback(async () => {
    const newGroup = {
      name,
      active,
    };

    createGroup(languagePackage.id || languagePackage.value, newGroup)
      .then(({ data }) => {
        onSubmitCallback && onSubmitCallback(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("jwt expired");
        }
      });
  }, [
    active,
    languagePackage.id,
    languagePackage.value,
    name,
    onSubmitCallback,
  ]);

  useEffect(() => {
    setCanSubmit(!(!name || !languagePackage));
  }, [languagePackage, name]);

  useEffect(() => {
    if (fixedPackage) {
      return;
    }

    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPackageItems(() =>
      languagePackages.map((p) => {
        const langs = p.name.split(" - ").map((e) => {
          const icon = languages.find((x) => x.name === e);
          return icon ? icon.icon + e : " " + e;
        });

        return {
          value: p.id,
          label: langs.join(" - "),
        };
      })
    );
  }, [languagePackages]);

  return (
    <div className="group-form">
      <div className="form-wrapper">
        <div className="dropdown">
          <div className="select-wrapper">
            <Select
              disabled={fixedPackage}
              required
              label={t("components.groupForm.languagePackage")}
              options={packageItems}
              onChange={(value) => {
                setLanguagePackage(value);
              }}
              value={languagePackage}
            />
          </div>
        </div>

        <TextInput
          required
          placeholder={t("global.name")}
          onChange={(value) => {
            setName(value);
          }}
          value={name}
        />
        <Switch
          appearance="on-off"
          optionLeft={t("screens.addVocab.activeLabel")}
          onChange={() => setActive((a) => !a)}
          checked={active}
        />
      </div>

      <Button disabled={!canSubmit} onClick={submitHandler}>
        {t("global.submit")}
      </Button>
    </div>
  );
};

export default GroupForm;
