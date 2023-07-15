import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEoiSF4vqrbqtJ9umHzmdgBnP8g5Hylfs",
  authDomain: "teste-react-matt.firebaseapp.com",
  projectId: "teste-react-matt",
  storageBucket: "teste-react-matt.appspot.com",
  messagingSenderId: "528759957993",
  appId: "1:528759957993:web:a0436aa3e9a0a3518c4378",
  measurementId: "G-900PYM82L1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getPosts() {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return postList;
}

export { db, getPosts, addDoc, deleteDoc, doc };