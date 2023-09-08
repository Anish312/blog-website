import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Import storage module
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyAaRvVM2zuC5ZYMC2uTxxVaxB9mZiUewq4",
    authDomain: "blogproject-a042e.firebaseapp.com",
    projectId: "blogproject-a042e",
    storageBucket: "blogproject-a042e.appspot.com",
    messagingSenderId: "55953027569",
    appId: "1:55953027569:web:e06dc7de7c47bb52349450"
  });

  const fb = firebase;

  // Get a reference to the default storage service
  const storage = firebase.storage();
  
export { fb ,storage };
