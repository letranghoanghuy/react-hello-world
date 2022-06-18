import * as firebase from "firebase/app";
import "firebase/database";
let config = {
    apiKey: "AIzaSyBBukzUFHJxHDXrx82dfyFt0XDAqovYhbk",
    authDomain: "reactjs-basic-app.firebaseapp.com",
    databaseURL: "https://reactjs-basic-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactjs-basic-app",
    storageBucket: "reactjs-basic-app.appspot.com",
    messagingSenderId: "179568837412",
    appId: "1:179568837412:web:2f431143022eda695129b1"
};
firebase.initializeApp(config);
export default firebase.database();