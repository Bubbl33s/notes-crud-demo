// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVZXcHYZAXGZpO1qg14QVMnntZzz8lDn4",
    authDomain: "todo-crud-demo-ee90a.firebaseapp.com",
    projectId: "todo-crud-demo-ee90a",
    storageBucket: "todo-crud-demo-ee90a.appspot.com",
    messagingSenderId: "848508216510",
    appId: "1:848508216510:web:baa8d0239ca8c150f86aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) =>
    addDoc(collection(db, 'tasks'), {title, description});

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTask = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newData) =>
    updateDoc(doc(db, 'tasks', id), newData);