import React, { createContext, useState } from "react";

const GuideContext = createContext();

export const GuideProvider = ({ children }) => {
  const [canContinue, setCanContinue] = useState(true);

  const providerValue = {
    canContinue,
    setCanContinue,
  };

  return (
    <GuideContext.Provider value={providerValue}>
      {children}
    </GuideContext.Provider>
  );
};

export default GuideContext;
