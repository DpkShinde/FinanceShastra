import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:"AIzaSyB8LBbkZAF-L_DrNsXwZKo5VSAHRuEOPqg",
  authDomain:"financeshastra-85665.firebaseapp.com",
  projectId:"financeshastra-85665",
  storageBucket:"financeshastra-85665.firebasestorage.app",
  messagingSenderId:"399291316622",
  appId:"1:399291316622:web:97ccb8f2d1cbb375a04cdf"
};
 
const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);
 
// Set session persistence to maintain the user's session across reloads
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Session persistence set to browserLocalPersistence.");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });
 
export { auth };
export default app;