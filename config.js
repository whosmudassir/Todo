import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyC3gQaZtmhe7Eyyscl-GU1e_lThUFssclw",
    authDomain: "p1-todo.firebaseapp.com",
    projectId: "p1-todo",
    storageBucket: "p1-todo.appspot.com",
    messagingSenderId: "950253998261",
    appId: "1:950253998261:web:a70690e4915b2d13bceefc"
  };

  firebase.initializeApp(firebaseConfig);

  const db=firebase.firestore();
  export {db};