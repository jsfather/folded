import { CostsContext } from "../contexts/CostContext";
import { useContext } from "react";

export const useCostsContext = () => {
  const context = useContext(CostsContext);

  if (!context) {
    throw Error("useCostsContext must be used in a CostsContextProvider");
  }

  return context;
};