import { db } from "@/firebase.Config";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";

const dbCollection = "partsOrders";

export async function addOrdersAcess(body: any) {
  const response = await addDoc(collection(db, dbCollection), body);

  return response;
}

export async function setOrdersAcess(body: any, id: string) {
  const response = await setDoc(doc(db, dbCollection, id), body);

  return response;
}

export async function updateOrdersAcess(body: any, id: string) {
  const response = await updateDoc(doc(db, dbCollection, id), body);

  return response;
}

export async function deleteOrdersAcess(id: string) {
  const requsitionDoc = doc(db, dbCollection, id);

  const response = await deleteDoc(requsitionDoc);

  return response;
}

export async function getOrdersAcess() {
  const q = query(collection(db, dbCollection));
  const response = await getDocs(q);

  const requisitions: any[] = [];

  response.forEach((doc) => {
    requisitions.push(doc.data());
  });

  return requisitions;
}
