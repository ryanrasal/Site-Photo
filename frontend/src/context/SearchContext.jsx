import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CurrentSearchContext = createContext();

export default CurrentSearchContext;

export function CurrentSearchContextProvider({ children }) {
  // fonction et state pour filter avec la barre de recherche
  const [filterSearch, setFilterSearch] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setFilterSearch(value);
  }

  return (
    <CurrentSearchContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ filterSearch, setFilterSearch, handleSearch }}
    >
      {children}
    </CurrentSearchContext.Provider>
  );
}

CurrentSearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentSearchContext = () => useContext(CurrentSearchContext);
