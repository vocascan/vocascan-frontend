import { useMemo } from "react";
import { useSelector } from "react-redux";

const useLanguage = (code) => {
  const languages = useSelector((state) => state.language.languages);

  const language = useMemo(
    () => languages?.find((language) => language.code === code),
    [code, languages]
  );

  return language;
};

export default useLanguage;
