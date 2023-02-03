/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../useLocalStorage";

const CurrentAdminContext = createContext();

export default CurrentAdminContext;

export function CurrentAdminContextProvider({ children }) {
  const [token, setToken] = useLocalStorage("token", "");
  const [admin, setAdmin] = useLocalStorage("admin", "");
  const [logged, setLogged] = useLocalStorage("logged", false);

  return (
    <CurrentAdminContext.Provider
      value={{
        token,
        setToken,
        admin,
        setAdmin,
        logged,
        setLogged,
      }}
    >
      {children}
    </CurrentAdminContext.Provider>
  );
}

CurrentAdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrentAdminContext = () => useContext(CurrentAdminContext);
