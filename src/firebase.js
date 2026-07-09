// Firebase-initiering. Konfigen är publika identifierare — åtkomsten
// styrs av säkerhetsreglerna i Firestore, inte av att detta hålls hemligt.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCpVopmEywDeuFDc9I2Jotc1cSz5UOuw5o',
    authDomain: 'mattekollen.firebaseapp.com',
    projectId: 'mattekollen',
    storageBucket: 'mattekollen.firebasestorage.app',
    messagingSenderId: '246448273474',
    appId: '1:246448273474:web:ace9ae73bd3e8ec88655db',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// Lokal cache gör att appen fungerar offline och synkar när nätet är tillbaka
let firestore;
try {
    firestore = initializeFirestore(firebaseApp, { localCache: persistentLocalCache() });
} catch {
    firestore = initializeFirestore(firebaseApp, {});
}
export const db = firestore;
