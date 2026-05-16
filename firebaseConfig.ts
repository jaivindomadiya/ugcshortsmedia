import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALH_tl1Krmy6peRo6jVdyiNZ3egAznTSo",
  authDomain: "ugcshortsmedia-9f035.firebaseapp.com",
  projectId: "ugcshortsmedia-9f035",
  storageBucket: "ugcshortsmedia-9f035.firebasestorage.app",
  messagingSenderId: "562159861774",
  appId: "1:562159861774:web:3f278a6821e8dcc81abc5f",
  measurementId: "G-ZDEMY43HX3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics lazily in the browser only so a missing/incomplete
// firebase/analytics install doesn't break the build or dev server.
if (typeof window !== 'undefined') {
  import('firebase/analytics')
    .then(({ getAnalytics, isSupported }) =>
      isSupported().then((supported) => {
        if (supported) getAnalytics(app);
      })
    )
    .catch(() => {
      /* analytics optional */
    });
}
