"use server";

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { initializeFirebase } from "@/firebase";
import { saveUser } from "@/firebase/users";

export async function handleSignIn() {
  const { auth, firestore } = initializeFirebase();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await saveUser(firestore, result.user);
    }
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function handleSignOut() {
    const { auth } = initializeFirebase();
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
