import { setArchivedOrdersAcess } from "@/services/dataAcess/archivedOrder";
import {
  deleteOrdersAcess,
  setOrdersAcess,
  updateOrdersAcess,
} from "@/services/dataAcess/orderAcess";
import { getOrdersObservers } from "@/services/observers/partsOrdersObservers";
import { createContext, useState } from "react";
import { toast } from "sonner";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface Order {
  orderDate: string;
  orderNumber: string;
  status: string;
  supplier: string;
  id: string;
  url: string;
}

interface AddOrder {
  supplier: string;
  orderNumber: string;
}

interface filterType {
  supplier?: string;
  status?: string;
}

interface OrdersContextType {
  ordersList: Order[];
  getOrdersList: () => void;
  removeFilters: () => void;
  addOrder: (order: AddOrder) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
  archiveOrder: (order: Order) => void;
  setHandleFilteredList: ({ supplier, status }: filterType) => void;
}

interface OrdersContextProviderProps {
  children: React.ReactNode;
}

export const OrdersContext = createContext({} as OrdersContextType);

export function OrdersContextProvider({
  children,
}: OrdersContextProviderProps) {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [listToFilter, setListToFilter] = useState<Order[]>([]);

  const getOrdersList = () => {
    getOrdersObservers(setOrdersList);
    getOrdersObservers(setListToFilter);
  };

  const setHandleFilteredList = ({ supplier, status }: filterType) => {
    if (!supplier && !status) {
      //setOrdersList(listToFilter);
      return;
    }

    let filteredList = listToFilter;

    if (supplier && status) {
      filteredList = listToFilter.filter(
        (order) => order.supplier === supplier && order.status === status,
      );
    } else if (supplier) {
      filteredList = listToFilter.filter(
        (order) => order.supplier === supplier,
      );
    } else if (status) {
      filteredList = listToFilter.filter((order) => order.status === status);
    }

    setOrdersList([...filteredList]);
  };

  const removeFilters = () => {
    setOrdersList(listToFilter);
  };

  const addOrder = ({ orderNumber, supplier }: AddOrder) => {
    const id = String(new Date().getTime());

    setOrdersAcess(
      {
        supplier,
        orderNumber,
        orderDate: String(new Date()),
        status: "Aguardando envio",
        id,
        url: "https://firebasestorage.googleapis.com/v0/b/portalservibras.appspot.com/o/orders%2F0_QOZm9X5er1Y0r5-t.jpg?alt=media&token=43d6629f-faa1-428e-b476-a67272672b37",
      },
      id,
    );
  };

  const updateOrder = (order: Order) => {
    updateOrdersAcess(order, order.id);
   // setFilteredList();
  };

  const deleteOrder = (id: string) => {
    deleteOrdersAcess(id);
  };

  const archiveOrder = ({
    supplier,
    orderNumber,
    orderDate,
    status,
    id,
    url,
  }: Order) => {
    try {
      if (status !== "Pedido entregue") {
        throw new Error("Pedido não entregue!");
      }

      // Arquiva o pedido
      setArchivedOrdersAcess(
        {
          supplier,
          orderNumber,
          deliveryDate: formatDistanceToNow(orderDate, {
            locale: ptBR,
          }),
          status,
          id,
          url,
        },
        id,
      );

      // Exclui o pedido arquivado
      deleteOrdersAcess(id);
    } catch (error) {
      // Retorna o erro como um objeto
      toast.error(`${error}`);
      return { error: (error as Error).message };
    }
  };

  

  return (
    <OrdersContext.Provider
      value={{
        ordersList,
        getOrdersList,
        removeFilters,
        setHandleFilteredList,
        addOrder,
        updateOrder,
        deleteOrder,
        archiveOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
