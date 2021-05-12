import React, { useCallback } from "react";
import ReactCountryFlag from "react-country-flag";
import { useSelector } from "react-redux";

const useCreateCountryFlags = () => {
  const storedLanguages = useSelector((state) => state.language.languages);
  const createCountryFlags = useCallback(() => {
    const languages = storedLanguages.map((language) => ({
      ...language,
      icon: (
        <ReactCountryFlag
          className="flag"
          style={{
            width: null,
            height: null,
          }}
          countryCode={language.code}
          svg
        />
      ),
    }));
    return languages;
  }, []);
  return {
    createCountryFlags,
  };
};

export default useCreateCountryFlags;
