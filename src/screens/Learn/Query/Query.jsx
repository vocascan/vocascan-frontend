import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import ProgressBar from "../../../Components/Charts/ProgressBar/ProgressBar.jsx";
import VocabCard from "../../../Components/VocabCard/VocabCard.jsx";

import useDebounceCallback from "../../../hooks/useDebounceCallback.js";
import useSnack from "../../../hooks/useSnack.js";
import {
  setQueryCorrect,
  setQueryWrong,
  setActualProgress,
} from "../../../redux/Actions/query.js";
import { getQueryVocabulary, checkQuery } from "../../../utils/api.js";

import "./Query.scss";

import { TouchBar, Button } from "@luwol03/react-touchbar-electron";

const Query = () => {
  const { t } = useTranslation();
  const { showSnack } = useSnack();
  const { direction } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const languagePackageId = useSelector(
    (state) => state.query.languagePackageId
  );
  const staged = useSelector((state) => state.query.staged);
  const limit = useSelector((state) => state.query.vocabsToday);

  const [vocabs, setVocabs] = useState([]);
  const [vocabSize, setVocabSize] = useState(0);
  const [currVocab, setCurrVocab] = useState(null);
  const correctVocabs = useSelector((state) => state.query.correct);
  const wrongVocabs = useSelector((state) => state.query.wrong);
  const actualProgress = useSelector((state) => state.query.actualProgress);
  const [loaded, setLoaded] = useState(false);
  const [currDirection, setCurrDirection] = useState(direction);
  const [buttonDisabled, setButtonDisabled] = useState(false);

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

  const sendVocabCheck = useCallback(
    (vocabularyCardId, answer, progress) => {
      // send result to server
      checkQuery(vocabularyCardId, answer, progress).catch((event) => {
        if (event.response?.status === 401 || event.response?.status === 404) {
          showSnack("error", "Error fetching stats");
          return;
        }

        showSnack("error", "Internal Server Error");
      });

      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 260);

      if (direction === "random") {
        setCurrDirection(
          Math.floor(Math.random() * 2) % 2 ? "default" : "backwards"
        );
      }

      //if answer is right and wrong vocabs haven't been repeated yet
      if (answer && wrongVocabs + correctVocabs < vocabSize) {
        dispatch(setQueryCorrect());
        dispatch(setActualProgress());
      }
      // if wrong vocabs get repeated, stop increment wrong or correct. Only increment counter for progress bar
      else if (answer) {
        dispatch(setActualProgress());
      }
      // if answer is wrong an wrong vocabs haven't been repeated yet, increment wrong counter
      else if (!answer && wrongVocabs + correctVocabs < vocabSize) {
        dispatch(setQueryWrong());
      }

      // if answer is correct shift the first card out of the array
      if (answer) {
        setVocabs(vocabs.slice(1));
      }
      // if answer is wrong put vocab card to the end of the query
      else {
        setVocabs([...vocabs.slice(1), vocabs[0]]);
      }
    },
    [
      correctVocabs,
      dispatch,
      showSnack,
      vocabSize,
      vocabs,
      wrongVocabs,
      direction,
    ]
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
    let timer1 = setTimeout(() => setCurrVocab(vocabs[0]), 260);

    return () => {
      clearTimeout(timer1);
    };
  }, [vocabs]);

  useEffect(() => {
    if (actualProgress > 0 && vocabs.length === 0) {
      history.push("/learn/end/");
    }
  }, [actualProgress, vocabs, history]);

  useEffect(() => {
    getVocabulary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCorrect = useDebounceCallback(
    useCallback(
      () => sendVocabCheck(currVocab.id, true, true),
      [currVocab?.id, sendVocabCheck]
    ),
    500
  );
  const onWrong = useDebounceCallback(
    useCallback(
      () => sendVocabCheck(currVocab.id, false, true),
      [currVocab?.id, sendVocabCheck]
    ),
    500
  );

  if (!loaded) {
    return null;
  }

  return (
    <>
      <TouchBar>
        <Button
          label={t("global.wrong")}
          onClick={onWrong}
          backgroundColor="#ff586e"
          enabled={!buttonDisabled}
        />
        <Button
          label={t("global.correct")}
          onClick={onCorrect}
          backgroundColor="#0acf97"
          enabled={!buttonDisabled}
        />
      </TouchBar>

      <div className="query-wrapper">
        <div className="progress">
          <ProgressBar
            value={actualProgress}
            max={vocabSize}
            bottomText={true}
          />
        </div>
        <div className="content">
          {currVocab && (
            <VocabCard
              currVocab={currVocab}
              onCorrect={onCorrect}
              onWrong={onWrong}
              disabled={buttonDisabled}
              currDirection={currDirection}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Query;
