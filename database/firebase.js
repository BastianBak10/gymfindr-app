import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Al Firebase-opsætning samlet ét sted, så både App.js og screens importerer herfra (undgår "require cycles").
// Værdierne kommer fra .env, ligesom OpenAI-nøglen, så de ikke ligger direkte i koden på GitHub.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialiser kun Firebase én gang (Expo kan genindlæse filen ved hot reload).
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Realtime Database. URL'en findes øverst på Realtime Database-siden i Firebase-konsollen.
export const rtdb = getDatabase(firebaseApp, process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL);
