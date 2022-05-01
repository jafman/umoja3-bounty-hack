import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 
import moment from 'moment';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = 'campaigns';
const rnd = Math.floor(Math.random()*50000)+1;
//const imgUrl = "https://picsum.photos/300/150?x="+rnd;
const IMG_URL = `https://picsum.photos/seed/${rnd}/300/150`;

async function submitCampaign(title, description, amount, deadline, created_by) {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      title,
      description,
      amount: Number(amount),
      donated: 0,
      deadline: moment(deadline).toDate(),
      created_by,
      created_at: now,
      updated_at: now,
      img_url: IMG_URL
    });
    console.log("Document written with ID: ", docRef.id);
    return true;

  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

export default submitCampaign;