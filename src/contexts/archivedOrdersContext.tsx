import { getArchivedOrdersObservers } from "@/services/observers/partsOrdersObservers";
import { createContext, useState } from "react";

interface Order {
  orderDate: string;
  orderNumber: string;
  status: string;
  supplier: string;
  id: string;
  url: string;
}

interface filterType {
  supplier?: string;
  status?: string;
}

interface ArchivedOrdersContextType {
  archivedOrdersList: Order[];
  getArchivedOrdersList: () => void;
  removeFilters: () => void;
  setHandleFilteredList: ({ supplier, status }: filterType) => void;
}

interface OrdersContextProviderProps {
  children: React.ReactNode;
}

export const ArchivedOrdersContext = createContext(
  {} as ArchivedOrdersContextType,
);

export function ArchivedOrdersContextProvider({
  children,
}: OrdersContextProviderProps) {
  const [archivedOrdersList, setArchivedOrdersList] = useState<Order[]>([]);
  const [listToFilter, setListToFilter] = useState<Order[]>([]);

  const getArchivedOrdersList = () => {
    getArchivedOrdersObservers(setArchivedOrdersList);
    getArchivedOrdersObservers(setListToFilter);
  };

  const setHandleFilteredList = ({ supplier, status }: filterType) => {
    if (!supplier && status) {
      const filteredList = listToFilter.filter(
        (order) => order.status === status,
      );
      setArchivedOrdersList(filteredList);

      return;
    }

    if (supplier && !status) {
      const filteredList = listToFilter.filter(
        (order) => order.supplier === supplier,
      );
      setArchivedOrdersList(filteredList);

      return;
    }

    if (supplier && status) {
      const filteredList = listToFilter
        .filter((order) => order.supplier === supplier)
        .filter((order) => order.status === status);
      setArchivedOrdersList(filteredList);

      return;
    }
  };

  const removeFilters = () => {
    setArchivedOrdersList(listToFilter);
  };

  return (
    <ArchivedOrdersContext.Provider
      value={{
        archivedOrdersList,
        getArchivedOrdersList,
        removeFilters,
        setHandleFilteredList,
      }}
    >
      {children}
    </ArchivedOrdersContext.Provider>
  );
}
