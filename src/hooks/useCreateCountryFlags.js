import React, { useCallback } from "react";
import ReactCountryFlag from "react-country-flag";

const useCreateCountryFlags = () => {
  const createCountryFlags = useCallback(() => {
    const languages = [
      { name: "German", code: "DE" },
      { name: "English", code: "GB" },
      { name: "Spanisch", code: "ES" },
      { name: "Portuguese", code: "PT" },
      { name: "Turkish", code: "TR" },
      { name: "Russian", code: "RU" },
      { name: "French", code: "FR" },
    ].map((language) => ({
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
