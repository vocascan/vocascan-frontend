import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import useSnack from "../../../hooks/useSnack.js";
import { getQueryVocabulary } from "../../../utils/api.js";

import "./Query.scss";

const Query = () => {
  const { showSnack } = useSnack();

  const languagePackageId = useSelector(
    (state) => state.learn.languagePackageId
  );
  const staged = useSelector((state) => state.learn.staged);
  const limit = useSelector((state) => state.learn.vocabsToday);

  const [vocabs, setVocabs] = useState([]);

  useEffect(() => {
    getVocabulary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div>
      {vocabs.map((vocab, index) => (
        <p>{vocab.name}</p>
      ))}
    </div>
  );
};

export default Query;
