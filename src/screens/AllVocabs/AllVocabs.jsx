import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./AllVocabs.scss";

import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import Table from "../../Components/Table/Table";
import VocabForm from "../../Forms/VocabForm/VocabForm";
import { getGroupVocabulary } from "../../utils/api";

const AllVocabs = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { groupId } = useParams();

  const [data, setData] = useState([]);
  const [currentVocab, setCurrentVocab] = useState(null);
  const [showVocabModal, setShowVocabModal] = useState(false);

  const editVocab = useCallback((pack) => {
    setCurrentVocab(pack);
    setShowVocabModal(true);
  }, []);

  const vocabSubmitted = useCallback(() => {
    getGroupVocabulary(groupId).then((response) => {
      setData(() =>
        response.data.map((elem) => {
          return {
            ...elem,
            translations: elem.Translations.map((el) => el.name).join(", "),
          };
        })
      );
    });
  }, [groupId]);

  const columns = useMemo(
    () => [
      {
        Header: t("screens.allVocabs.vocabel"),
        accessor: "name",
        Cell: ({ row }) => (
          <Button variant="link" onClick={() => editVocab(row.original)}>
            {row.original.name}
          </Button>
        ),
      },
      {
        Header: t("screens.allVocabs.translations"),
        accessor: "translations",
      },
    ],
    [editVocab, t]
  );

  useEffect(() => {
    getGroupVocabulary(groupId).then((response) => {
      setData(() =>
        response.data.map((elem) => {
          return {
            ...elem,
            translations: elem.Translations.map((el) => el.name).join(", "),
          };
        })
      );
    });
  }, [groupId]);

  return (
    <>
      <div className="all-vocabs-wrapper">
        <div className="header-wrapper">
          <ArrowBackIcon className="back" onClick={history.goBack} />
          <h1 className="heading">{t("screens.allVocabs.title")}</h1>
        </div>
        <div>
          <Table columns={columns} data={data} />
        </div>
      </div>

      <Modal
        title={"Edit Vocabular"}
        open={showVocabModal}
        onClose={() => setShowVocabModal(false)}
        xxl
      >
        <VocabForm
          defaultData={currentVocab}
          onSubmitCallback={vocabSubmitted}
        />
      </Modal>
    </>
  );
};

export default AllVocabs;
