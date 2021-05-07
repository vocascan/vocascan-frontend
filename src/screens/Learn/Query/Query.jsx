import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Button from "../../../Components/Button/Button.jsx";
import ProgressBar from "../../../Components/Charts/ProgressBar/ProgressBar.jsx";

import useSnack from "../../../hooks/useSnack.js";
import { getQueryVocabulary, checkQuery } from "../../../utils/api.js";

import "./Query.scss";

const RenderForeignWord = ({ currVocab }) => {
  return (
    <div className="foreign-word-wrapper">
      <h1>{currVocab.name}</h1>
    </div>
  );
};

const RenderTranslatedWord = ({ currVocab }) => {
  return (
    <div className="translated-word-wrapper">
      <div>
        <p className="my-20">{currVocab.description}</p>
        <div className="my-20 translations">
          {currVocab.Translations.map((el) => el.name).join(", ")}
        </div>
      </div>
    </div>
  );
};

const Query = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const { direction } = useParams();

  const languagePackageId = useSelector(
    (state) => state.learn.languagePackageId
  );
  const staged = useSelector((state) => state.learn.staged);
  const limit = useSelector((state) => state.learn.vocabsToday);

  const [vocabs, setVocabs] = useState([]);
  const [vocabSize, setVocabSize] = useState(0);
  const [currVocab, setCurrVocab] = useState(null);
  const [actualProgress, setActualProgress] = useState(0);
  const [flip, setFlip] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currDirection, setCurrDirection] = useState(direction);

  const getVocabulary = useCallback(() => {
    getQueryVocabulary(languagePackageId, staged, limit)
      .then((response) => {
        //store stats
        setVocabs(response.data);
        setVocabSize(response.data.length);
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

  const sendVocabCheck = useCallback(
    (vocabularyCardId, answer, progress) => {
      checkQuery(vocabularyCardId, answer, progress)
        .then((response) => {
          // if staged, increment the counter on client because of missing progress on server side for staged queries
          if (answer) {
            setCorrectVocabs((prev) => prev + 1);
            setActualProgress((prev) => prev + 1);
          } else {
            setWrongVocabs((prev) => prev + 1);
          }
          //if answer is wrong put vocabs card to the end of the query
          answer ? vocabs.shift() : vocabs.push(vocabs.shift());
          setCurrVocab(vocabs[0]);
        })
        .catch((event) => {
          if (
            event.response?.status === 401 ||
            event.response?.status === 404
          ) {
            showSnack("error", "Error fetching stats");
            return;
          }

          showSnack("error", "Internal Server Error");
        });
    },
    [showSnack, vocabs]
  );

  useEffect(() => {
    if (direction === "random") {
      setCurrDirection(
        Math.floor(Math.random() * 2) % 2 ? "default" : "backwards"
      );
    }

    setLoaded(true);
  }, [direction]);

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

  if (!loaded) {
    return null;
  }

  return (
    <div className="query-wrapper">
      <div className="progress">
        <ProgressBar value={actualProgress} max={vocabSize} bottomText={true} />
      </div>
      <div className="content">
        {currVocab && (
          <div className="card">
            <div className={`card-inner ${flip ? "flipped" : ""}`}>
              <div className="card-front" onClick={onCheck}>
                <div className="card-front-inner">
                  {currDirection === "default" ? (
                    <RenderForeignWord currVocab={currVocab} />
                  ) : (
                    <RenderTranslatedWord currVocab={currVocab} />
                  )}
                </div>
              </div>
              <div className="card-back" onClick={onCheck}>
                <div className="card-back-inner">
                  {currDirection === "default" ? (
                    <RenderTranslatedWord currVocab={currVocab} />
                  ) : (
                    <RenderForeignWord currVocab={currVocab} />
                  )}
                  <div className="continue">
                    <Button
                      className="card-button"
                      appearance="red"
                      onClick={() => {
                        sendVocabCheck(currVocab.id, false, true);
                      }}
                    >
                      {t("global.wrong")}
                    </Button>
                    <Button
                      className="card-button"
                      appearance="green"
                      onClick={() => {
                        sendVocabCheck(currVocab.id, true, true);
                      }}
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
    </div>
  );
};

export default Query;
