import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import {
  FirebaseProvider,
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
} from '@/firebase/provider';
import { useUser } from './auth/use-user';
import { firebaseConfig } from './config';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

function initializeFirebase() {
  const apps = getApps();
  const app = apps.length
    ? apps[0]
    : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export {
  FirebaseProvider,
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useUser,
  firebaseConfig,
  initializeFirebase,
  FirebaseClientProvider,
  useCollection,
  useDoc,
};
