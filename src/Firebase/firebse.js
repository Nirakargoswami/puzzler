// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";


import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    setDoc,
    getDoc,
    updateDoc,
    doc,
    addDoc,
    deleteDoc
    
    
} from "firebase/firestore";
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9_5dTMJAwvA0RhqSbppnz-0um_IIHztI",
    authDomain: "wordle-99fb9.firebaseapp.com",
    projectId: "wordle-99fb9",
    storageBucket: "wordle-99fb9.appspot.com",
    messagingSenderId: "543055598072",
    appId: "1:543055598072:web:83f1a768a753adc068460d",
    measurementId: "G-B33XG7DQLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const storage = getStorage(app);



const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const Creatuser = async (data,name) => {
    // console.log(name)
    const q = query(collection(db, "Quizmingle"));
    const querySnapshot = await getDocs(q);
    let user
    const docRef = await addDoc(collection(db, "Quizmingle"),
        { data ,name}
    )
    const newDocId = docRef.id
    console.log(newDocId, "Document Created")
    return newDocId
}
const Getuserdata = async (id) => {
    const retrievedDocRef = doc(db, "Quizmingle", id);
    const retrievedDocSnapshot = await getDoc(retrievedDocRef);
    
    if (retrievedDocSnapshot.exists()) {
      const retrievedData = retrievedDocSnapshot.data();
      console.log("Retrieved Data:", retrievedData);
      return retrievedData
    } else {
      console.log("Document not found");
    }
}
const HandleImageUpdload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
return downloadURL
    console.log('Image uploaded successfully');
  };

  const retrieveImage = async (imageName) => {
    const storageRef = ref(storage, `images/${imageName}`);
    
    try {
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error retrieving image:', error);
      return null;
    }
  };
  const fetchQuizzes = async () => {
    try {
      const quizzesSnapshot = await getDocs(collection(db, "Quizmingle"));
      const quizzesData = quizzesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  
export {
    auth,
    HandleImageUpdload,
    db,
    fetchQuizzes,
    retrieveImage,
    Creatuser,
    Getuserdata,
    collection,
    updateDoc,
    getDocs,
    addDoc,
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    
};
