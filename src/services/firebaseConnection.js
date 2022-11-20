import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyCGybfZPA2_ch6hUiaOInohIw0V3lh4AjM",
    authDomain: "meuapp-269b1.firebaseapp.com",
    databaseURL: "https://meuapp-269b1-default-rtdb.firebaseio.com",
    projectId: "meuapp-269b1",
    storageBucket: "meuapp-269b1.appspot.com",
    messagingSenderId: "275442779152",
    appId: "1:275442779152:web:f91c79f32931ce3f59f695",
    measurementId: "G-4CWM567TCR"
};

if(!firebase.apps.length){
  //Abrir minha conexao
  firebase.initializeApp(firebaseConfig);
}

export default firebase;