"use server";

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeFirebase } from "@/firebase";

export async function handleSignIn() {
  const { auth } = initializeFirebase();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
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
