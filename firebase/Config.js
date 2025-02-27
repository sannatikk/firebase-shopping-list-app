// tähän tiedostoon kerätään kaikki firebaseen liittyvät asetukset ja funktiot
// jotta voidaan yhdellä importilla tuoda kaikki tarvittavat asiat

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  }

initializeApp(firebaseConfig)   // alustetaan firebase käyttöön
const firestore = getFirestore() // firestore on nyt valmis käytettäväksi
const TASKS = "tasks" // stringivakio

export { firestore, collection, addDoc, TASKS, orderBy, query, serverTimestamp, getAuth, signInWithEmailAndPassword, onSnapshot } // exportataan tarvittavat asiat käytettäväksi muualla