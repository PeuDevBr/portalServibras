import { setArchivedOrdersAcess } from "@/services/dataAcess/archivedOrder";
import {
  deleteOrdersAcess,
  getOrdersAcess,
  setOrdersAcess,
  updateOrdersAcess,
} from "@/services/dataAcess/orderAcess";
import { getOrdersObservers } from "@/services/observers/partsOrdersObservers";
import { createContext, useState } from "react";
import { toast } from "sonner";

import { storage } from "@/firebase.Config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
  setFilteredList: () => void;
  removeFilters: () => void;
  addOrder: (order: AddOrder) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
  archiveOrder: (order: Order) => void;
  uploadFile: (event: any) => void;
  setHandleFilteredList: ({ supplier, status }: filterType) => void;
}

interface UploadFileType {
  event: any;
  id: string;
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

  function setFilteredList() {
    getOrdersAcess().then((res: any) => {
      setListToFilter(res);
    });
  }

  if (listToFilter.length < ordersList.length) {
    setFilteredList();
  }

  const getOrdersList = () => {
    getOrdersObservers(setOrdersList);
  };

  const setHandleFilteredList = ({ supplier, status }: filterType) => {
    if (!supplier && status) {
      const filteredList = listToFilter.filter(
        (order) => order.status === status,
      );
      setOrdersList(filteredList);

      return;
    }

    if (supplier && !status) {
      const filteredList = listToFilter.filter(
        (order) => order.supplier === supplier,
      );
      setOrdersList(filteredList);

      return;
    }

    if (supplier && status) {
      const filteredList = listToFilter
        .filter((order) => order.supplier === supplier)
        .filter((order) => order.status === status);
      setOrdersList(filteredList);

      return;
    }
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
    setFilteredList();
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
  }: Order) => {
    try {
      if (status !== "Pedido entregue") {
        throw new Error("Pedido não entregue!");
      }
      setArchivedOrdersAcess(
        {
          supplier,
          orderNumber,
          orderDate,
          status,
          id,
        },
        id,
      );
    } catch (error) {
      toast.error(`${error}`);

      return;
    }

    deleteOrdersAcess(id);
  };

  const uploadFile = ({ event }: UploadFileType) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${"id"}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
        });
      },
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        ordersList,
        getOrdersList,
        setFilteredList,
        removeFilters,
        setHandleFilteredList,
        addOrder,
        updateOrder,
        deleteOrder,
        archiveOrder,
        uploadFile,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
