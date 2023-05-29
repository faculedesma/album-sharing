import * as firebase from "firebase/compat";

// add firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDYiImttuSO4pkxXpdq18DGqCGo7XpyubU",
  authDomain: "album-sharing-207d4.firebaseapp.com",
  projectId: "album-sharing-207d4",
  storageBucket: "album-sharing-207d4.appspot.com",
  messagingSenderId: "108649315678",
  appId: "1:108649315678:web:50e954d9241b1294ce63cf",
  measurementId: "G-H5MJJ4ZVHD",
};

// initialize firebase app
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// initialize auth
const auth = firebase.auth();

export { auth };
