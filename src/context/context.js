import React, { createContext } from "react";
import { useNavigate } from "react-router";

export const ContextData = createContext();

const StateProvider = ({ children }) => {
  const word = "hello";

  const navigate = useNavigate();

  return (
    <ContextData.Provider value={{ navigate: navigate, word: word }}>
      {children}
    </ContextData.Provider>
  );
};

export default StateProvider;
