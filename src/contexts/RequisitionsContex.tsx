import { createContext, useState } from "react";

import { getRequisitionsObservers } from "@/services/observers/requisitionsObservers";
import { deleteRequisitionsAction } from "@/services/actions/requisitionsAction";

interface RequisitionsContextType {
  handleSetSearchValue: (value: string) => void;
}

interface RequisitionsContextProviderProps {
  children: React.ReactNode;
}

export const RequisitionsContext = createContext({} as any);

export function RequisitionsContextProvider({
  children,
}: RequisitionsContextProviderProps) {
  const [requisitionsList, setRequisitionsList] = useState<any[]>([]);

  const getRequisitionsList = () => {
    getRequisitionsObservers(setRequisitionsList);
  };

  const handleSetFilteredList = (value: string) => {
    const filteredList = requisitionsList.filter(
      (requisition) => requisition.technicianName === value,
    );
    setRequisitionsList(filteredList);
  };

  const handleRemoveFilters = () => {
    getRequisitionsObservers(setRequisitionsList);
  };

  async function handleDeleteRequisition(id: string) {
    await deleteRequisitionsAction(id);
  }

  return (
    <RequisitionsContext.Provider
      value={{
        handleSetFilteredList,
        handleRemoveFilters,
        handleDeleteRequisition,
        getRequisitionsList,
        requisitionsList,
      }}
    >
      {children}
    </RequisitionsContext.Provider>
  );
}
