import { db } from "@/firebase.Config";
import { setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  updateLocalDataBaseVersion,
  updateWebDataBaseVersion,
} from "./loadDBData";

import { ref, getStorage, deleteObject } from "firebase/storage";

//import productsList from "@/services/dataAcess/productsList.json";

const dbCollection = "products";

export async function setProductsAcess(body: any, id: string) {
  const response = await setDoc(doc(db, dbCollection, id), body);

  updateWebDataBaseVersion();
  updateLocalDataBaseVersion();

  return response;
}

export async function updateProductAcess(body: any, id: string) {
  const response = await updateDoc(doc(db, dbCollection, id), body);

  updateWebDataBaseVersion();
  updateLocalDataBaseVersion();

  return response;
}

const storageImage = getStorage();
export async function deleteProductAcess(code: string) {
  const orderToDeleteDoc = doc(db, dbCollection, code);

  const response = await deleteDoc(orderToDeleteDoc);

  const imgToDeleteRef = ref(storageImage, `parts/${code}.png`);
  deleteObject(imgToDeleteRef);

  updateWebDataBaseVersion();
  updateLocalDataBaseVersion();

  return response;
}

/*
export function addProductToWebDBWithUrl() {
  const jsonData = localStorage.getItem("productsList");

  if (jsonData) {
    // Convertendo os dados de volta para um objeto JavaScript
    const productsList = JSON.parse(jsonData);

    productsList.forEach((product: any) => {
      getDownloadURL(ref(storageImage, `parts/${product.code}.png`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          setProductsAcess(
            {
              brand: product.brand,
              code: product.code,
              name: product.name,
              subject: product.subject,
              model: product.model || "",
              title: product.title || "",
              url,
            },
            product.code,
          );
        })
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
    });
  }
}*/
