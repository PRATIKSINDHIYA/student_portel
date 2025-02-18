import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3UfpfRcw_AjJ3HYVxVfGofXkhchmoBb4",
  authDomain: "studentdetailmanager.firebaseapp.com",
  databaseURL: "https://studentdetailmanager-default-rtdb.firebaseio.com",
  projectId: "studentdetailmanager",
  storageBucket: "studentdetailmanager.firebasestorage.app",
  messagingSenderId: "567521009401",
  appId: "1:567521009401:web:9d83b2306fa1a38d8ecc28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

