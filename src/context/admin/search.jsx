import React, { createContext, useState, useContext } from "react";

// Create the context
const SearchContext = createContext();

// Create a provider component
export function SearchProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook to use the Search context
export function useSearch() {
  return useContext(SearchContext);
}
