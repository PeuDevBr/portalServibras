import { db } from "@/firebase.Config";
import { collection, query, where, onSnapshot } from "firebase/firestore";

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

export function getSearchTechnicianObservers(
  //callback = setRequisition()
  callback: React.Dispatch<React.SetStateAction<any[]>>,
  searchValue: string,
) {
  const q = query(
    collection(db, dbCollection),
    where("technicianName", "==", searchValue),
  );

  onSnapshot(q, (snapshot) => {
    const requisitions: any[] = [];
    snapshot.forEach((doc) => {
      requisitions.push(doc.data());
    });

    callback(requisitions);
  });
}
