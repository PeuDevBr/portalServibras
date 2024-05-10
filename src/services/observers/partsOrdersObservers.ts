import { db } from "@/firebase.Config";
import { collection, query, onSnapshot } from "firebase/firestore";

const dbOrdersCollection = "partsOrders";
const dbArchivedCollection = "archivedOrders";

export function getOrdersObservers(
  //callback = setRequisition()
  callback: React.Dispatch<React.SetStateAction<any[]>>,
) {
  const q = query(collection(db, dbOrdersCollection));

  onSnapshot(q, (snapshot) => {
    const orders: any[] = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data());
    });

    callback(orders);
  });
}

export function getArchivedOrdersObservers(
  //callback = setRequisition()
  callback: React.Dispatch<React.SetStateAction<any[]>>,
) {
  const q = query(collection(db, dbArchivedCollection));

  onSnapshot(q, (snapshot) => {
    const orders: any[] = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data());
    });

    callback(orders);
  });
}
