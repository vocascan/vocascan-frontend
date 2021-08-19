import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../../Components/Button/Button.jsx";
import Select, {
  SelectOptionWithFlag,
} from "../../../Components/Form/Select/Select.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import PackageForm from "../../../Forms/PackageForm/PackageForm.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getPackages, importGroup } from "../../../utils/api.js";

import "./GroupPreview.scss";

const GroupPreview = ({ data }) => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const [group, setGroup] = useState(data);
  const [packages, setPackages] = useState([]);
  const [packageItems, setPackageItems] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState({});
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
    importGroup(group, selectedPackage.value, true, false)
      .then((response) => {
        showSnack("success", t("screens.allPackages.exportSuccessMessage"));
      })
      .catch((e) => {
        showSnack("error", t("screens.allPackages.exportFailMessage"));
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

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="group-preview">
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
        <p>{data.name}</p>
        <p>{data.foreignWordLanguage}</p>

        <Button block uppercase onClick={submitImport}>
          {t("global.signIn")}
        </Button>
      </div>
      <Modal
        title={"Add Package"}
        open={showAddPackage}
        onClose={closePackageModal}
      >
        <PackageForm onSubmitCallback={packageAdded} />
      </Modal>
    </>
  );
};

export default GroupPreview;
