import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import ArrayTextInput from "../../Components/ArrayTextInput/ArrayTextInput.jsx";
import Button from "../../Components/Button/Button.jsx";
import Select from "../../Components/Select/Select.jsx";
import TextInput from "../../Components/TextInput/TextInput.jsx";

import { getPackages, createVocabulary } from "../../utils/api.js";
import { maxTranslations } from "../../utils/constants.js";

import "./AddVocab.scss";

const AddVocab = () => {
  const { t } = useTranslation();

  const [packages, setPackages] = useState([]);
  const [packageItems, setPackageItems] = useState([]);
  const [packageId, setPackageId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupsItems, setGroupsItems] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [foreignWord, setForeignWord] = useState("");
  const [translations, setTranslations] = useState([""]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getPackages(true)
      .then(({ data }) => {
        setPackages(data);
      })
      .catch(function (err) {});
  }, []);

  useEffect(() => {
    setGroups(() => {
      const grps = packages.find((x) => x.id === packageId);

      if (!grps) {
        return [];
      }

      return grps.Groups;
    });

    setGroupId(null);
  }, [packages, packageId]);

  const onSubmit = useCallback(() => {
    const submitTranslations = translations.map((elem) => {
      return {
        name: elem,
      };
    });

    createVocabulary(packageId, groupId, {
      name: foreignWord,
      translations: submitTranslations,
    })
      .then((response) => {
        setError(false);
        setPackageId("");
      })
      .catch(function (e) {
        setError(true);
      });
  }, [packageId, groupId, foreignWord, translations]);

  // function addGroup(value) {
  //   vocascan.addGroup(value, packageId);
  //   refreshGroups();
  //   console.log(value);
  //   console.log(packageId);
  // }

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  useEffect(() => {
    setPackageItems(() =>
      packages.map((p) => {
        return {
          value: p.id,
          label: p.name,
        };
      })
    );
  }, [packages]);

  useEffect(() => {
    setGroupsItems(() =>
      groups.map((p) => {
        return {
          value: p.id,
          label: p.name,
        };
      })
    );
  }, [groups]);

  return (
    <div className="add-vocab-form">
      <h1 className="heading">{t("screens.addVocab.title")}</h1>

      <div className="dropdowns">
        <div className="select-wrapper">
          <Select
            required
            tabIndex={1}
            label={t("global.package")}
            options={packageItems}
            onChange={(value) => {
              setPackageId(value);
            }}
            value={packageId}
            noOptionsMessage={t("screens.addVocab.noPackagesMessage")}
          />
        </div>
        <div className="select-wrapper">
          <Select
            required
            tabIndex={1}
            label={t("global.group")}
            options={groupsItems}
            onChange={(value) => {
              setGroupId(value);
            }}
            value={groupId}
            noOptionsMessage={t("screens.addVocab.noGroupsMessage")}
          />
        </div>
      </div>
      <div className="input-fields">
        <TextInput
          required
          tabIndex={1}
          placeholder={t("global.foreignWord")}
          onChange={(value) => {
            setForeignWord(value);
          }}
          value={foreignWord}
        />
        <ArrayTextInput
          required
          max={maxTranslations}
          data={translations}
          placeholder={t("global.translation")}
          onChange={setTranslations}
          addText={t("screens.addVocab.addTranslation")}
        />
        <TextInput
          tabIndex={1}
          placeholder={t("global.description")}
          onChange={(value) => {
            setDescription(value);
          }}
          value={description}
        />
      </div>

      <div className="form-submit">
        <Button
          block
          tabIndex={-1}
          onClick={onSubmit}
          disabled={
            !(
              foreignWord &&
              translations?.length &&
              groupId?.length &&
              packageId
            )
          }
        >
          {t("global.add")}
        </Button>
      </div>
    </div>
  );
};

export default AddVocab;
