import { createContext, useState } from "react";

import { getRequisitionsObservers } from "@/services/observers/requisitionsObservers";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  deleteRequisitionsAcess,
} from "@/services/dataAcess/requisitionAcess";

interface Requisition {
  id: string;
  technicianName: string;
  itemDescription: string;
  amount: string;
  openingDate: string;
}

interface filterType {
  technicianName?: string;
  date?: Date | undefined;
}

interface RequisitionsContextType {
  getRequisitionsList: () => void;
  handleSetFilteredList: (data: filterType) => void;
  handleRemoveFilters: () => void;
  handleDeleteRequisition: (id: string) => void;
  requisitionsList: Requisition[];
}

interface RequisitionsContextProviderProps {
  children: React.ReactNode;
}

export const RequisitionsContext = createContext({} as RequisitionsContextType);

export function RequisitionsContextProvider({
  children,
}: RequisitionsContextProviderProps) {
  const [requisitionsList, setRequisitionsList] = useState<any[]>([]);
  const [listToFilter, setListToFilter] = useState<any[]>([]);

  const getRequisitionsList = () => {
    getRequisitionsObservers(setRequisitionsList);
    getRequisitionsObservers(setListToFilter);
  };

  function handleSetFilteredList({ date, technicianName }: filterType) {
    if (!date && technicianName) {
      const filteredList = listToFilter.filter(
        (requisition) => requisition.technicianName === technicianName,
      );
      setRequisitionsList(filteredList);

      return;
    }

    if (date && !technicianName) {
      const formatedDate = format(date, " d 'de' LLLL 'de' yyyy", {
        locale: ptBR,
      });

      const filteredList = listToFilter.filter(
        (requisition) => requisition.openingDate === formatedDate,
      );
      setRequisitionsList(filteredList);

      return;
    }

    if (date && technicianName) {
      const formatedDate = format(date, " d 'de' LLLL 'de' yyyy", {
        locale: ptBR,
      });

      const filteredList = listToFilter
        .filter((requisition) => requisition.openingDate === formatedDate)
        .filter((requisition) => requisition.technicianName === technicianName);
      setRequisitionsList(filteredList);

      return;
    }
  }

  const handleRemoveFilters = () => {
    setRequisitionsList(listToFilter);
  };

  async function handleDeleteRequisition(id: string) {
    await deleteRequisitionsAcess(id);
    //setFilteredList();
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
