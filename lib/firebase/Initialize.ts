import { initializeApp } from "firebase/app";

// Web app firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTNdUFrzbgJuPU_KoG_EEkpsWAZqvUOCo",
  authDomain: "md-editor-1cdca.firebaseapp.com",
  projectId: "md-editor-1cdca",
  storageBucket: "md-editor-1cdca.appspot.com",
  messagingSenderId: "765468198419",
  appId: "1:765468198419:web:75df5e180264c4e119a1e6",
  measurementId: "G-WK3TH6Z3KF",
};

export const app = initializeApp(firebaseConfig);
