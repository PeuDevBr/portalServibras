import { db } from "@/firebase.Config";
import { setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { updateLoadDBDataAcess } from "./loadDBData";

//import productsList from "@/services/dataAcess/productsList.json";

const dbCollection = "products";

export async function setProductsAcess(body: any, id: string) {
  const response = await setDoc(doc(db, dbCollection, id), body);

  console.log("setProducts");
  console.log(body);

  updateLoadDBDataAcess();

  return response;
}

export async function updateProductAcess(body: any, id: string) {
  const response = await updateDoc(doc(db, dbCollection, id), body);

  updateLoadDBDataAcess();
  return response;
}

export async function deleteProductAcess(code: string) {
  const orderToDeleteDoc = doc(db, dbCollection, code);

  const response = await deleteDoc(orderToDeleteDoc);

  //const imgToDeleteRef = ref(storage, `product/${code}`);
  //deleteObject(imgToDeleteRef);

  updateLoadDBDataAcess();
  return response;
}

/*export function addProduct() {
  productsList.forEach((product) => {
    setTimeout(() => {
      setProductsAcess(product, product.code);
      console.log("Adicionando... " + product.code);
    }, 100);
    
  });
  
  
}*/
