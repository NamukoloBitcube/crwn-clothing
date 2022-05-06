import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';


import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCKZ4VA78gSMY6HoMXOtiwFdA-juV4ekR4",
    authDomain: "crwn-clothing-db-19e15.firebaseapp.com",
    projectId: "crwn-clothing-db-19e15",
    storageBucket: "crwn-clothing-db-19e15.appspot.com",
    messagingSenderId: "1051992281205",
    appId: "1:1051992281205:web:e9e2bf287488a42d94283c"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  });


// interface layer functions

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db =  getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
      const userDocRef =  doc(db, 'users', userAuth.uid);

      console.log("created user: ",userDocRef)

      const userSnapshot = await getDoc(userDocRef);
      console.log("snapshot:", userSnapshot)
      console.log("user exists:", userSnapshot.exists());

      if(!userSnapshot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try{
              await setDoc(userDocRef,{
                  displayName,
                  email,
                  createdAt,
                  ...additionalInfo
              });
          }catch(error){
            console.log('error :', error.message)
          }

          return userDocRef;
      }
  }

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;

    try{
        console.log(`AUTH: ${auth}\nEMAIL: ${email} \nPASSWORD: ${password}`)
         return await createUserWithEmailAndPassword(auth, email, password)
    }catch(error){
        console.log("Failed to create User: ", error.message)
    }
}



export const signInUserWithEmailAndPassword = async (email, password) => {
    if( !email || !password ) return;

    console.log(`EMAIL: ${email} \nPASSWORD: ${password}`)
    return await signInWithEmailAndPassword(auth, email,password)
}


export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback )