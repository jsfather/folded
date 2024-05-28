import { createContext, useReducer } from "react";

export const CostsContext = createContext();

export const costsReducer = (state, action) => {
  switch (action.type) {
    case"SET_COSTS":
      return {
        costs: action.payload
      };
    case"CREATE_COSTS":
      return {
        costs: [action.payload, ...state.costs]
      };
    default:
      return state;
  }
};

export const CostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(costsReducer, {
    costs: null
  });

  return (
    <CostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CostsContext.Provider>
  );
};