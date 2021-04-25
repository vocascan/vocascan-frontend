import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "../../../Components/Button/Button.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getQueryVocabulary } from "../../../utils/api.js";

import "./Query.scss";

const Query = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();

  const languagePackageId = useSelector(
    (state) => state.learn.languagePackageId
  );
  const staged = useSelector((state) => state.learn.staged);
  const limit = useSelector((state) => state.learn.vocabsToday);

  const [vocabs, setVocabs] = useState([]);
  const [currVocab, setCurrVocab] = useState(null);
  const [flip, setFlip] = useState(false);

  const getVocabulary = useCallback(() => {
    getQueryVocabulary(languagePackageId, staged, limit)
      .then((response) => {
        //store stats
        setVocabs(response.data);
      })
      .catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }

        showSnack("error", "Internal Server Error");
      });
  }, [languagePackageId, limit, showSnack, staged]);

  const onCheck = useCallback(() => {
    setFlip((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!vocabs) {
      return;
    }

    setCurrVocab(vocabs[0]);
  }, [vocabs]);

  useEffect(() => {
    getVocabulary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="query-wrapper">
      <div className="progress">Imagin here is an awesome progress bar</div>
      <div className="content">
        {currVocab && (
          <div className="card">
            <div className={`card-inner ${flip ? "flipped" : ""}`}>
              <div className="card-front">
                <h1>{currVocab.name}</h1>
              </div>
              <div className="card-back">
                <div>
                  <h1 className="my-50">{currVocab.name}</h1>
                  <p className="my-50">{currVocab.description}</p>
                  <div className="my-50 translations">
                    {currVocab.Translations.map((el) => el.name).join(", ")}
                  </div>
                  <div className="my-50 continue">
                    <Button
                      className="card-button"
                      appearance="red"
                      onClick={onCheck}
                    >
                      {t("global.wrong")}
                    </Button>
                    <Button
                      className="card-button"
                      appearance="green"
                      onClick={onCheck}
                    >
                      {t("global.correct")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <Button className="card-button" onClick={onCheck}>
          {flip ? "Back" : "Check"}
        </Button>
      </div>
    </div>
  );
};

export default Query;
