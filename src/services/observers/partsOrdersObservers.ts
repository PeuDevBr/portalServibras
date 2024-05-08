import { db } from "@/firebase.Config";
import { collection, query, onSnapshot } from "firebase/firestore";

const dbCollection = "partsOrders";

export function getOrdersObservers(
  //callback = setRequisition()
  callback: React.Dispatch<React.SetStateAction<any[]>>,
) {
  const q = query(collection(db, dbCollection));

  onSnapshot(q, (snapshot) => {
    const orders: any[] = [];
    snapshot.forEach((doc) => {
      orders.push(doc.data());
    });

    callback(orders);
  });
}
