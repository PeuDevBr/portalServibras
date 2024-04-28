import { db } from "@/firebase.Config";
import { collection, query, onSnapshot } from "firebase/firestore";

const dbCollection = "requisitions";

export function getRequisitionsObservers(
  //callback = setRequisition()
  callback: React.Dispatch<React.SetStateAction<any[]>>,
) {
  const q = query(collection(db, dbCollection));

  onSnapshot(q, (snapshot) => {
    const requisitions: any[] = [];
    snapshot.forEach((doc) => {
      requisitions.push(doc.data());
    });

    callback(requisitions);
  });
}
