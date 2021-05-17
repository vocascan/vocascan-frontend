import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { SelectOptionWithFlag } from "../../Components/Form/Select/Select.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import SlideShow from "../../Components/SlideShow/SlideShow.jsx";
import GroupForm from "../../Forms/GroupForm/GroupForm.jsx";
import PackageForm from "../../Forms/PackageForm/PackageForm.jsx";
import VocabForm from "../../Forms/VocabForm/VocabForm.jsx";

import useSnack from "../../hooks/useSnack.js";

import "./FirstStartup.scss";

const FirstStartup = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const isFirstLogin = true; //useSelector((state) => state.login.firstLogin);
  const [show, setShow] = useState(isFirstLogin);

  const [selectedPackage, setSelectedPackage] = useState(null);

  const [selectedGroup, setSelectedGroup] = useState(null);

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
      showSnack("success", t("screens.firstStartup.savePackageSuccessMessage"));
    },
    [showSnack, t]
  );

  const groupAdded = useCallback((newGroup) => {
    setSelectedGroup({ value: newGroup.id, label: newGroup.name });
    showSnack("success", t("screens.firstStartup.saveGroupSuccessMessage"));
  }, []);

  const vocabAdded = useCallback(() => {
    showSnack("success", t("screens.firstStartup.saveVocabSuccessMessage"));
  }, [showSnack, t]);

  const onEnd = useCallback(() => {
    setShow(false);
  }, []);

  const pages = [
    <PackageForm onSubmitCallback={packageAdded} />,
    <GroupForm
      selectedPackage={selectedPackage}
      onSubmitCallback={groupAdded}
    />,
    <VocabForm onSubmitCallback={vocabAdded} />,
  ];

  if (!isFirstLogin) {
    return null;
  }

  return (
    <Modal
      title={t("screens.firstStartup.title")}
      open={show}
      onClose={() => setShow(false)}
    >
      <SlideShow pages={pages} onEnd={onEnd} />
    </Modal>
  );
};

export default FirstStartup;
