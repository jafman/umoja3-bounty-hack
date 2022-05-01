import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = 'campaigns';

async function submitCampaign(title, description, amount, deadline, created_by) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      title,
      description,
      amount,
      deadline,
      created_by
    });
    console.log("Document written with ID: ", docRef.id);
    return true;

  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

export default submitCampaign;