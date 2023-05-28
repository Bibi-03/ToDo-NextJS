import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB94Cltp5-wXR4BoAX8ln-it2QHetmO-rA",
  authDomain: "todo-app-a4490.firebaseapp.com",
  projectId: "todo-app-a4490",
  storageBucket: "todo-app-a4490.appspot.com",
  messagingSenderId: "827208495825",
  appId: "1:827208495825:web:1d39997444ca942fcc4bf0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
