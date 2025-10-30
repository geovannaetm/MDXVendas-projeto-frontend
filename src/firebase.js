import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDW0Yh8Faf5dPufxI9Esso7nBYiOjTc87Y",
  authDomain: "mdxlogin-49e6e.firebaseapp.com",
  projectId: "mdxlogin-49e6e",
  storageBucket: "mdxlogin-49e6e.firebasestorage.app",
  messagingSenderId: "519798141875",
  appId: "1:519798141875:web:1a6d4cd0d0208b3e0c91c6",
  measurementId: "G-WE09M0ME5C"
};

// Initialize Firebase
const app =  !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if(typeof window !== 'undefined') {
    isSupported().then((yes) =>{   
        if (yes) analytics = getAnalytics(app);
    });
}

// criar a autenticação com o Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signInWithGooglePopup() {
    try{
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    }catch(error){
        console.error('Erro no Login:' , error);
        throw error;
    }
    
}

// encerrar o login 
export async function logout() {
    try{
        await signOut(auth);
    }catch(error){
        console.error('Erro ao sair:' , error);
        throw error;
    }
}

export {auth, googleProvider, app, analytics}