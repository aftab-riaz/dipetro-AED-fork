import { createContext, useEffect, useState } from "react";
import { getStatesList } from "../api/statesApi";

export const StatesContext = createContext();

export const StatesProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const data = await getStatesList();
        setStates(data);
      } catch (error) {
        console.error("Error loading states:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStates();
  }, []);

  return (
    <StatesContext.Provider value={{ states, loading }}>
      {children}
    </StatesContext.Provider>
  );
};
