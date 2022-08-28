import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, addDoc, getDocs, getDoc } from "firebase/firestore"; 
import moment from 'moment';
let campaignCache = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const collectionName = 'campaigns';
const rnd = Math.floor(Math.random()*50000)+1;
const IMG_URL = `https://picsum.photos/seed/${rnd}/300/150`;

const submitCampaign = async (title, description, amount, deadline, created_by) => {
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
    //console.log("Document written with ID: ", docRef.id);
    return true;

  } catch (error) {
    //console.error("Error adding document: ", error);
    return false;
  }
}

const getCampaigns = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let campaigns = [];
  let campaign = {};
  querySnapshot.forEach((doc) => {
    campaign = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      amount: doc.data().amount,
      donated: doc.data().donated,
      deadline: doc.data().deadline,
      created_by: doc.data().created_by,
      created_at: doc.data().created_at,
      updated_at: doc.data().updated_at,
      img_url: doc.data().img_url
    }
    campaigns.push(campaign);
    campaignCache[doc.id] = campaign;
  });
  return campaigns;
}

const getCampaign = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return {
      id: docSnap.id,
      title: docSnap.data().title,
      description: docSnap.data().description,
      amount: docSnap.data().amount,
      donated: docSnap.data().donated,
      deadline: docSnap.data().deadline,
      created_by: docSnap.data().created_by,
      created_at: docSnap.data().created_at,
      updated_at: docSnap.data().updated_at,
      img_url: docSnap.data().img_url
    };
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
    return null;
  }
}

const  makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

const uploadImg = async (file, folder) => {
  try {
    const _path = folder+makeid(10);
    const storageRef = ref(storage, _path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    // console.log('This file can be downloaded here:', downloadUrl);
    return downloadUrl;
  } catch (e) {
    console.log('Error uploading image to firestore', e);
    return false;
  }
}

const createAuction = async (title, description, amount, imgUrl, contractAddress) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  try { 
    const docRef = await addDoc(collection(db, 'auctions'), {
      title,
      description,
      amount: Number(amount),
      created_at: now,
      updated_at: now,
      img_url: imgUrl,
      contractAddress
    });
    //console.log("Document written with ID: ", docRef.id);
    return true;

  } catch (error) {
    //console.error("Error adding document: ", error);
    return false;
  }
}

export { submitCampaign, getCampaigns, getCampaign, uploadImg, createAuction };