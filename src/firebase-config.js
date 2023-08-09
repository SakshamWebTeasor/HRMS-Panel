// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCePe60G5Tqmaid0TVwtWW1ExVVXO58AjE",
//     authDomain: "hrm-project-7c904.firebaseapp.com",
//     projectId: "hrm-project-7c904",
//     storageBucket: "hrm-project-7c904.appspot.com",
//     messagingSenderId: "57168219258",
//     appId: "1:57168219258:web:7d65978a8062920c237fc3"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyBy_sAs_xPyPTxOvEdtRdDgBA1ZsmdF4hc",
  authDomain: "wtsrhrms.firebaseapp.com",
  projectId: "wtsrhrms",
  storageBucket: "wtsrhrms.appspot.com",
  messagingSenderId: "739723480055",
  appId: "1:739723480055:web:3f6f28fd599fdec1003cf2",
  measurementId: "G-FWGLHSYWT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const storage = getStorage(app);
export { storage }
