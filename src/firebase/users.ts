'use client';

import { doc, setDoc, Firestore, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function saveUser(db: Firestore, user: User) {
  const userRef = doc(db, 'users', user.uid);
  const userData = {
    uid: user.uid,
    lastLogin: serverTimestamp(),
  };

  setDoc(userRef, userData, { merge: true }).catch((error) => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: userRef.path,
        operation: 'write',
        requestResourceData: userData,
      })
    );
  });
}
