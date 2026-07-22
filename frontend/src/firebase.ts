import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoDummyKeyForShaivikaLMSPlatform2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'shaivika-lms.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'shaivika-lms-platform',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'shaivika-lms-platform.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
};

// Initialize Firebase App safely
let app: FirebaseApp;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} catch (e) {
  console.warn('Firebase init warning:', e);
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig, 'fallbackApp');
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
export default app;
