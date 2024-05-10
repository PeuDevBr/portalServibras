import { db } from "@/firebase.Config";
import {
  setDoc,
  doc,
  query,
  collection,
  getDocs,
} from "firebase/firestore";

const dbCollection = "archivedOrders";

export async function setArchivedOrdersAcess(body: any, id: string) {
  const response = await setDoc(doc(db, dbCollection, id), body);

  return response;
}

export async function getArchivedOrdersAcess() {
  const q = query(collection(db, dbCollection));
  const response = await getDocs(q);

  const requisitions: any[] = [];

  response.forEach((doc) => {
    requisitions.push(doc.data());
  });

  return requisitions;
}

