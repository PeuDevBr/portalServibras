//import { db } from "@/firebase.Config";
//import { collection, query, onSnapshot } from "firebase/firestore";
//const dbProductsCollection = "products";

export function getProductsObservers() {
  //callback = setRequisition()
  //callback: React.Dispatch<React.SetStateAction<any[]>>,
  //const refProductsDB = query(collection(db, dbProductsCollection));

  let localDB = localStorage.getItem("localDB");
  let webDB = localStorage.getItem("webDB");

  if (localDB !== webDB) {
    /*onSnapshot(refProductsDB, (snapshot) => {
      const orders: any[] = [];
      snapshot.forEach((doc) => {
        orders.push(doc.data());
      });

      const jsonData = JSON.stringify(orders);
      // Salvando no localStorage
      localStorage.setItem("productsList", jsonData);

      //callback(orders);
    });*/

    localStorage.setItem("localDB", "1");

    console.log("aqui");
  }
}
