import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCw2-OP0RMSm8JayW0Fg4rR7FsB4R6b1o",
  authDomain: "fooxt-react.firebaseapp.com",
  databaseURL: "https://fooxt-react-default-rtdb.firebaseio.com",
  projectId: "fooxt-react",
  storageBucket: "fooxt-react.appspot.com",
  messagingSenderId: "834917126761",
  appId: "1:834917126761:web:42dc10a14003c36bfa88f8"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
//basically doing the initialising if not done already

const firestore = getFirestore(app);
const storage = getStorage(app);
//then getting the firestore (for docs) and the storage (for images)

export { app, firestore, storage };
