import { db } from "@/firebase.Config";
import {
  setDoc,
  doc,
} from "firebase/firestore";

const dbCollection = "archivedOrders";

export async function setArchivedOrdersAcess(body: any, id: string) {
  const response = await setDoc(doc(db, dbCollection, id), body);

  return response;
}

