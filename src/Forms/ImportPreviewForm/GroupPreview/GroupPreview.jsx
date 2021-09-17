import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Button from "../../../Components/Button/Button.jsx";
import Details from "../../../Components/Details/Details.jsx";
import Select, {
  SelectOptionWithFlag,
} from "../../../Components/Form/Select/Select.jsx";
import TextInput from "../../../Components/Form/TextInput/TextInput.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import Table from "../../../Components/Table/Table.jsx";
import PackageForm from "../../../Forms/PackageForm/PackageForm.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getPackages, importGroup } from "../../../utils/api.js";
import { delay } from "../../../utils/index.js";

//import "./GroupPreview.scss";

const GroupPreview = ({ onSubmitCallback, importedData }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [importedGroup, setImportedGroup] = useState(importedData);
  const [packages, setPackages] = useState([]);
  const [packageItems, setPackageItems] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showAddPackage, setShowAddPackage] = useState(false);

  const openPackageModal = useCallback(() => {
    setShowAddPackage(true);
  }, []);

  const closePackageModal = useCallback(() => {
    setShowAddPackage(false);
  }, []);

  const fetchPackages = useCallback(() => {
    getPackages(true)
      .then(({ data }) => {
        setPackages(data);
      })
      .catch((err) => {
        showSnack("error", t("global.fetchError"));
      });
  }, [showSnack, t]);

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const packageAdded = useCallback(
    (newPackage) => {
      setSelectedPackage({
        value: newPackage.id,
        label: (
          <SelectOptionWithFlag
            name={newPackage.name}
            foreignLanguageCode={newPackage.foreignWordLanguage}
            translatedLanguageCode={newPackage.translatedWordLanguage}
          />
        ),
      });
      closePackageModal();
      fetchPackages();
    },
    [closePackageModal, fetchPackages]
  );

  const submitImport = () => {
    importGroup(importedGroup, selectedPackage.value, true, false)
      .then(async (response) => {
        showSnack("success", t("screens.allGroups.importSuccessMessage"));
        await delay(1000);
        onSubmitCallback && onSubmitCallback();
      })
      .catch((e) => {
        showSnack("error", t("screens.allGroups.importFailMessage"));
      });
  };

  useEffect(() => {
    setPackageItems(() =>
      packages.map((p) => {
        return {
          value: p.id,
          label: (
            <SelectOptionWithFlag
              name={p.name}
              foreignLanguageCode={p.foreignWordLanguage}
              translatedLanguageCode={p.translatedWordLanguage}
            />
          ),
        };
      })
    );
  }, [packages]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allVocabs.vocabulary"),
        accessor: "name",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.name}</p>
          </div>
        ),
      },
      {
        Header: t("screens.allVocabs.description"),
        accessor: "description",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.description}</p>
          </div>
        ),
      },
      {
        Header: t("screens.allVocabs.translations"),
        accessor: "translations",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            <p>{row.original.Translations.map((el) => el.name).join(", ")}</p>
          </div>
        ),
      },
      {
        Header: t("screens.allGroups.active"),
        accessor: "active",
        Cell: ({ row }) => (
          <div style={{ textAlign: "left" }}>
            {<CheckCircleIcon className="text-success" />}
          </div>
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <div className="group-preview">
        <div className="update-fields">
          <Select
            required
            creatable
            createText={t("components.vocabForm.packageCreateText")}
            onCreate={openPackageModal}
            tabIndex={-1}
            label={t("global.package")}
            options={packageItems}
            onChange={(v) => {
              setSelectedPackage(v);
            }}
            value={selectedPackage}
            noOptionsMessage={t("components.vocabForm.noPackagesMessage")}
          />
          <TextInput
            autoFocus
            required
            placeholder={t("global.name")}
            onChange={(value) => {
              setImportedGroup((prevState) => ({
                ...prevState,
                name: value,
              }));
            }}
            value={importedGroup.name}
            max={255}
            min={1}
          />
          <TextInput
            autoFocus
            required
            placeholder={t("global.description")}
            onChange={(value) => {
              setImportedGroup((prevState) => ({
                ...prevState,
                description: value,
              }));
            }}
            value={importedGroup.description}
            max={255}
            min={1}
          />

          <Details
            summary={t("global.vocabs")}
            count={importedGroup?.VocabularyCards.length}
            open={false}
            key={1}
          >
            <Table
              pagination={false}
              columns={columns}
              data={importedGroup.VocabularyCards}
            />
          </Details>
        </div>
        <div className="submit-btn">
          <Button
            block
            uppercase
            onClick={submitImport}
            disabled={!importedData || !selectedPackage}
          >
            {t("global.import")}
          </Button>
        </div>
      </div>
      <Modal
        title={t("screens.allPackages.addPackage")}
        open={showAddPackage}
        onClose={closePackageModal}
      >
        <PackageForm onSubmitCallback={packageAdded} />
      </Modal>
    </>
  );
};

export default GroupPreview;
