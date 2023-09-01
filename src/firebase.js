import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBnANTmUkUfSU2g-c0w32QWaiHpfs2H4rw",
    authDomain: "e-commerse-react-fed4c.firebaseapp.com",
    projectId: "e-commerse-react-fed4c",
    storageBucket: "e-commerse-react-fed4c.appspot.com",
    messagingSenderId: "1047716977858",
    appId: "1:1047716977858:web:b091a1574e861f53ebaf5b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  export {auth}