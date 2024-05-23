import { db } from "@/firebase.Config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { collection, query, onSnapshot } from "firebase/firestore";
const dbProductsCollection = "products";
const dbLoadDBCollection = "loadDB";

const webDBRef = doc(db, "loadDB", "JeRM5lrLePjgfthnuvK0");

export async function loadWebDataBase() {
  const docSnap = await getDoc(webDBRef);
  const refProductsDB = query(collection(db, dbProductsCollection));

  let localDBVersion = localStorage.getItem("localDBVersion");

  if (!localDBVersion) {
    localStorage.setItem("localDBVersion", "0");
    localDBVersion = localStorage.getItem("localDBVersion");
  }

  if (docSnap.exists()) {
    const webDBVersion = docSnap.data().webDBVersion;

    if (webDBVersion !== localDBVersion) {
      console.log("webDBVersion loaded successfully");

      onSnapshot(refProductsDB, (snapshot) => {
        const orders: any[] = [];
        snapshot.forEach((doc) => {
          orders.push(doc.data());
        });

        const jsonData = JSON.stringify(orders);
        localStorage.setItem("productsList", jsonData);
        localStorage.setItem("localDBVersion", webDBVersion);
      });
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function updateWebDataBaseVersion() {
  const id = "JeRM5lrLePjgfthnuvK0";

  const docSnap = await getDoc(webDBRef);

  if (docSnap.exists()) {
    let webDBVersion = docSnap.data().webDBVersion;

    const data = {
      webDBVersion: String(Number(webDBVersion) + 1),
    };

    const response = await updateDoc(doc(db, dbLoadDBCollection, id), data);

    return response;
  }
}

export function updateLocalDataBaseVersion() {
  const localDBVersion = localStorage.getItem("localDBVersion");

  const updatedLocalDBVersion = String(Number(localDBVersion) + 1);

  localStorage.setItem("localDBVersion", updatedLocalDBVersion);
}
