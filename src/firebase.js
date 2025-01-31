import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TBD",
  projectId: "TBD,
  storageBucket: "TBD",
  appId: "TBD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
