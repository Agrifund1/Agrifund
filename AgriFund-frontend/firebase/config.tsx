// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp35IIpefqr7AVShX120Nt8d_Zy59_Gmg",
  authDomain: "agrifund-514cf.firebaseapp.com",
  projectId: "agrifund-514cf",
  storageBucket: "agrifund-514cf.firebasestorage.app",
  messagingSenderId: "737024528004",
  appId: "1:737024528004:web:2ccd509ec22b1e41183cd1",
  measurementId: "G-0NR2E28K1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;