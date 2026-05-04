"use client";
import { createContext, useContext, useState } from "react";

const SelectedPropertyContext = createContext(null);

export const SelectedPropertyProvider = ({ children }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <SelectedPropertyContext.Provider
      value={{ selectedProperty, setSelectedProperty }}
    >
      {children}
    </SelectedPropertyContext.Provider>
  );
};

export const useSelectedProperty = () => useContext(SelectedPropertyContext);
