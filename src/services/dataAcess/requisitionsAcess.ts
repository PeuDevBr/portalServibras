import { db } from "@/firebase.Config";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  query,
} from "firebase/firestore";

const dbCollection = "requisitions";

export async function addRequisitionsAcess(body: any) {
  const response = await addDoc(collection(db, dbCollection), body);

  return response;
}

export async function setRequisitionsAcess(body: any, id: string) {
  const response = await setDoc(doc(db, dbCollection, id), body);

  return response;
}

export async function updateRequisitionsAcess(body: any, id: string) {
  const response = await updateDoc(doc(db, dbCollection, id), body);

  return response;
}

export async function getRequisitionsAcess() {
  const q = query(collection(db, dbCollection));
  const response = await getDocs(q);

  return response;
}
