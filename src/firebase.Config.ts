import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG3fwG76o7hcn2oWYTCw1i-iKbudLvKbU",
  authDomain: "portalservibras.firebaseapp.com",
  projectId: "portalservibras",
  storageBucket: "portalservibras.appspot.com",
  messagingSenderId: "434426858570",
  appId: "1:434426858570:web:f6667640c84ad2972e2ab3",
  measurementId: "G-14HF0H7J2T",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
