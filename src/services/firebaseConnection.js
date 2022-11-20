import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "..............................",
    authDomain: "..............................",
    databaseURL: "..............................",
    projectId: "..............................",
    storageBucket: "..............................",
    messagingSenderId: "..............................",
    appId: "..............................",
    measurementId: ".............................."
};

if(!firebase.apps.length){
  //Abrir minha conexao
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
